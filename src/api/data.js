import { getUserData } from '../util.js';
import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

function createPointer (className, objectId){
    return {
        __type: 'Pointer',
        className,
        objectId
    }
}

function addOwner (record){
    const {id} = getUserData();
    record.owner = createPointer('_User', id);
    return record;
}

export async function getGames(){
    return api.get('/classes/Game');
}

export async function getGameById(id){
    return api.get(`/classes/Game/${id}?include=owner`);
}

export async function createGame(game){
    addOwner(game);
    return api.post('/classes/Game', game);
}

export async function editGame(id, game){
    return api.put('/classes/Game/'+id, game);
}

export async function deleteGame(id){
    return api.del('/classes/Game/'+id);
}

export async function getComments(){
    return api.get(`/classes/Comment?include=owner`);
}

export async function addComment(gameId, comment){
    comment.game = createPointer('Game', gameId);
    addOwner(comment);
    return api.post('/classes/Comment', comment)
}