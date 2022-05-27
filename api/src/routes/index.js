const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { getPokeByName, showAllPokemonById, addNewPokemon , getAllTypes} = require ('../controller/controller.js')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', getPokeByName);
router.get('/pokemons/:id', showAllPokemonById);
router.post('/pokemons', addNewPokemon)
router.get('/types', getAllTypes);



module.exports = router;
