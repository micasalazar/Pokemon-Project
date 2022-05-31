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
                types: p.types.map(t=> t.type)

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
        }) 
    }catch(error){
        console.log(error)
    }    
}
//==========================================End POKEMON By DataBase==================================================


//==========================================POKEMON API&DATABASE====================================================

const getMixInfo = async () => { //me traigo todo de Api y Data Base                
        const apiInfo = await getApiInfo();    //Me traigo data de Api
        const dbInfo = await getPokemonDb();   //Me traigo data de DataBase
        const allInfo = [...apiInfo,...dbInfo]   //-->concateno ambdas
        return allInfo;
    };

// ==========================================FIND POKEMON BY NAME====================================================
const showAllPokemon = async (name) => {
    try {
      const pokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      const arr = [pokeApi.data];
      let pokeName = arr.map((p) => {
        let pokeObj = {
          id: p.id,
          name: p.name,
          image: p.sprites.other.home.front_default,
          hp: p.stats[0].base_stat,
          attack: p.stats[1].base_stat,
          defense: p.stats[2].base_stat,
          defense: p.stats[5].base_stat,
          height: p.height,
          weight: p.weight,
          types: p.types.map((t) => t.type),
        };
        return pokeObj;
      });
      
      return pokeName;
    } catch (error) {
      return [];
    }
  };

//====================================================== REQUEST======================================================

//=================================================GET /pokemons======================================================
const getPokeByName = async (req, res) => {
    const { name } = req.query;
  
    try {
      if (name) {
        const pokemonDb = await getPokemonDb();
        const pokeByApi = await showAllPokemon(name);
  
        const pokeDb = pokemonDb.filter(
          (e) => e.name.toLowerCase() === name.toLowerCase()
        );
//   Para que solo  me traiga un pokemon creado por mi que ya existe en la api, debo comentar renglo 115-116-117, sacar el else y dejar solo el if
        if (pokeDb.length > 0 && pokeByApi.length > 0) {
          const allPoke = pokeDb.concat(pokeByApi);
          return res.send(allPoke);
        } else if (pokeDb.length > 0) {
          return res.status(200).send(pokeDb);
        } else if (pokeByApi.length > 0) {
          return res.status(200).send(pokeByApi);
        } else {
          return res.status(404).send({ msg: "Pokemon Not Found", status: false });
        }
      } 
      else {
        const allPoke = await getMixInfo();
        return res.status(200).send(allPoke);
      }
    } catch (error) {
      res.status(404).send({ msg: "Pokemon Not Found" });
    }
  };

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
                    types: e.types.map(e => e.type),
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
        types,
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
            where:{name:types}
                       
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
    showAllPokemon,
    getPokeByName,
    showAllPokemonById,
    getAllTypes, 
    addNewPokemon   
}





