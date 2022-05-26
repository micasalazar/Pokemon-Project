const {Sequelize, Op} = require ('sequelize');
const axios = require ('axios');
const { Pokemon , Type} = require ('../db');


//=================================================POKEMONS By Api===================================================

const getApiInfo = async () => {
    try{        
        let pokeUrl = await axios.get('https://pokeapi.co/api/v2/pokemon');// hago un request para los primeros 20 pokemons
        let pokeUrlNext = await axios.get(pokeUrl.data.next);// hago un request para los next 20 pokemons
        let resultPokemon = pokeUrl.data.results.concat(pokeUrlNext.data.results);//concateno para traer los 40 poke
        const pokemons = await Promise.all(
            resultPokemon.map(async (e) =>{
            const poke = await axios.get(e.url)//ingreso a las url de cada pokemon para retornar sus propiedades
            const p = poke.data;
            return{
                id: p.id,
                name: p.name,
                image: p.sprites.other.home.front_default,
                hp: p.stats[0].base_stat,
                attack: p.stats[1].base_stat,
                defense: p.stats[2].base_stat,
                defense: p.stats[5].base_stat,
                height: p.height,
                weight: p.weight,
                type: p.types.map(t=> t.type.name)

                };            
            })
            
            )
         return pokemons; 

        }catch(error){
            console.log(error)
        }
}   
// ======================================End POKEMON By Api=============================================================




//========================================POKEMON By DataBase=========================================================

const getPokemonDb = async () => {
    try{
        return await Pokemon.findAll({
            include:{
                model: Type,
                attributes:['name'],
                through: {
                    attributes:[]// me trae todos los atributos de la base de datos
                }
            }
        }); 
    }catch(error){
        console.log(error)
    }    
}
//==========================================End POKEMON By DataBase==================================================


//==========================================POKEMON API&DATABASE====================================================

const getMixInfo = async () => { //me traigo todo                 
        const apiInfo = await getApiInfo();    //api y base de datos
        const dbInfo = await getPokemonDb();
        const allInfo = [...apiInfo,...dbInfo]   //-->concateno
        return allInfo;
    };



//====================================================== REQUEST======================================================

//=================================================GET /pokemons======================================================

const showPokemons = async(req,res)=>{
    const {name} = req.query;
try{    
    if(name){
        const pokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        const arr = [pokeApi.data];
       
        let pokeName = arr.map(p =>{

            let pokeObj={
                id: p.id,
                name: p.name,
                image: p.sprites.other.home.front_default,
                hp: p.stats[0].base_stat,
                attack: p.stats[1].base_stat,
                defense: p.stats[2].base_stat,
                defense: p.stats[5].base_stat,
                height: p.height,
                weight: p.weight,
                type: p.types.map(t=> t.type.name)
            }               
            return pokeObj;            
        })         
         const pokemonDb = await getPokemonDb();         
         const pokeDb = pokemonDb.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
         const allPokeInfo = pokeName.concat(pokeDb)       
       
        allPokeInfo
        ? res.status(200).send(allPokeInfo)
        : res.status(404).send({msg:"Pokemon Not Found by Name" })
    
    }
    else{
        const allPokeInfo = await getMixInfo()
        res.status(200).send(allPokeInfo)
    }
}catch(error){
    res.status(404).send({msg:"Pokemon Not Found by Name", status:false })
}
}
//===================================== GET /pokemons/:id===========================================================

const showAllPokemonById = async (req, res) =>{
    const {id} = req.params;
    try{    
        if(id.length > 20 ){
           
            const pokemonIdDb = await getPokemonDb();
            const pokeIdDb = pokemonIdDb.filter(e => e.id == id)

            pokeIdDb
            ? res.status(200).send(pokeIdDb)
            : res.status(404).send({msg:"Pokemon Not Found in DB by ID"})
         
        }
        else{
            const pokeIdApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const arr = [pokeIdApi.data];
    
            const pokeId = arr.map(e =>{
    
                let pokeObj={
                    id: e.id,
                    name: e.name,
                    hp: e.stats[0].base_stat,
                    attack: e.stats[1].base_stat,
                    defense: e.stats[2].base_stat,
                    speed: e.stats[5].base_stat,       
                    height: e.height,
                    weight: e.weight,
                    type: e.types.map(e => e.type.name),
                    image: e.sprites.front_default
                }
                return pokeObj;
                
            })
            pokeId.length > 0
            ? res.status(200).json(pokeId)
            :res.status(404).json({msg: "Pokemon not Found in Api by ID"})
        }
       
        
    }catch(error){
        res.status(404).json({msg: "Pokemon not Found in Api by ID"})        
    }
}

//============================================= GET /types===========================================================

const getAllTypes = async(req, res)=>{
    try {
        const typeUrl = await axios.get(`https://pokeapi.co/api/v2/type`)
        const {results} = typeUrl.data

        for(let i = 0; i< results.length; i++){
            const { name } = results[i]

            await Type.findOrCreate({
                where: {name : name}
            })
        }
        const allTypes = await Type.findAll()
        res.status(200).json(allTypes)
        
    } catch (error) {
        
    }
}
//=====================================================POST /pokemons=================================================

const addNewPokemon = async(req, res)=>{
    let {
        id,
        name,
        hp,
        attack,
        defense,
        speed,       
        height,
        weight,
        type,
        image,
        createdInDb
    }= req.body;
    try {    
        let newPokemon = await Pokemon.create({
            id,
            name,
            hp,
            attack,
            defense,
            speed,       
            height,
            weight,           
            image,            
            createdInDb   
        });
        const allTypes = await Type.findAll({
            where:{name:type}
                       
        })
        newPokemon.addType(allTypes)
        res.status(200).json('Pokemon was created succesfully!')
        
    } catch (error) {
        res.status(404).json({msg:'Pokemon could not be Created'})        
    }
 }

module.exports = {
    getApiInfo,
    getPokemonDb,
    getMixInfo,
    showPokemons,
    showAllPokemonById,
    getAllTypes, 
    addNewPokemon   
}





