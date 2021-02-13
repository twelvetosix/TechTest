import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

Vue.use(Vuex)
Vue.use(BootstrapVue)

const store = new Vuex.Store({
    state: {
        allMovies: [],
    },
    mutations: {
        changeList(state, allMovies) {
            state.allMovies = allMovies;
        },        
        removeMovie(state, id) {
            state.allMovies = state.allMovies.filter(item => item.id !== id)
        },
        addToList(state, movie) {
            state.allMovies.push(movie)
        },
        updateList(state, movie) {
            var idx = state.allMovies.findIndex((obj => obj.id == movie.id));
            state.allMovies[idx].name = movie.name;
            state.allMovies[idx].description = movie.description;
            state.allMovies[idx].releaseYear = movie.releaseYear;
        }


    },
    getters: {
        allMovies: state => state.allMovies,
    },
    // actions
    actions: {
        getAllMovies({ commit }) {
            axios.get('/api/movies').then(
                response => {
                    commit('changeList', response.data);
                }).
                catch(function (error) {
                    console.log(error);
                })                    
        },
        addMovie({ commit }, { payload }) {            
            var toSend = {
                id: null,
                name: payload.name,
                description: payload.description,
                releaseYear: parseInt(payload.releaseYear)
            };
            axios.post('/api/movies/Add', JSON.stringify(toSend), { headers: { 'Content-Type': 'application/json; charset=utf-8' } }).
                then(response => {
                    commit('addToList', response.data);
                    this._vm.$bvToast.toast('Successfully added ' + response.data.name, {
                        variant: 'success',
                        solid: true,
                        toaster: 'b-toaster-top-full'
                    });
                }).
                catch(function (error) {
                    console.log(JSON.stringify(error))
                    this._vm.$bvToast.toast('Could not add new movie ' + payload.name, {
                        variant: 'warning',
                        solid: true,
                        toaster: 'b-toaster-top-full'
                    });
                });
        }, 
        updateMovie({ commit }, { payload }) {            
            var toSend = {
                id: payload.id,
                name: payload.name,
                description: payload.description,
                releaseYear: parseInt(payload.releaseYear)
            };
            axios.put('/api/movies/Update', JSON.stringify(toSend), { headers: { 'Content-Type': 'application/json; charset=utf-8' } }).
                then(response => {
                    commit('updateList', response.data);
                    this._vm.$bvToast.toast('Successfully added ' + response.data.name, {
                        variant: 'success',
                        solid: true,
                        toaster: 'b-toaster-top-full'
                    });
                }).
                catch(function (error) {
                    console.log(JSON.stringify(error))
                    this._vm.$bvToast.toast('Could not update movie ' + payload.name, {
                        variant: 'warning',
                        solid: true,
                        toaster: 'b-toaster-top-full'
                    });
                });
        },       
           
        
        deleteMovie({ commit }, { payload }) {
            axios.delete('/api/movies/Delete?id=' + payload.id).
                then(() => {
                    commit('removeMovie', payload.id);
                    this._vm.$bvToast.toast('Successfully deleted ' + payload.name, {
                        variant: 'success',
                        solid: true,
                        toaster: 'b-toaster-top-full'
                    });                   
                }).
                catch(function (error) {
                    console.log(JSON.stringify(error))
                    this._vm.$bvToast.toast('Could not delete ' + payload.name, {
                        variant: 'warning',
                        solid: true,
                        toaster: 'b-toaster-top-full'
                    });    
                });        
  
        }
    }


})
export default store;