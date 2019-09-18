import { board, auth, card } from '../api'

const actions = {
    LOGIN({ commit }, { email, password }) {
        return auth.login(email, password)
            .then(({ accessToken }) => commit('LOGIN', accessToken))
    },
    ADD_BOARD(_, { title }){
        return board.create(title).then(data => data.item)
    },
    FETCH_BOARDS({ commit }) {
        return board.fetch().then(data => {
            commit('SET_BOARDS', data.list)
        })
    },
    FETCH_BOARD({ commit }, {id}) {
        return board.fetch(id)
            .then(data => commit('SET_BOARD', data.item))
    },
    ADD_CARD ({ state, dispatch }, { title, listId, pos }){
        return card.create(title, listId, pos)
            .then(() => dispatch('FETCH_BOARD', state.board.id ) )
    }
}

export default actions