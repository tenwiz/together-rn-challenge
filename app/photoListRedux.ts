export const types = {
	GET: 'GET',
	ADD: 'ADD',
	REMOVE: 'REMOVE',
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
	get: (items) => {
		return { type: types.GET, payload: items }
	},
	add: (item) => {
		return { type: types.ADD, payload: item }
	},
	remove: (index) => {
		return { type: types.REMOVE, payload: index }
	}
}

// Initial state of the store
const initialState = {
	photos: [],
}

export const reducer = (state = initialState, action) => {
	const { photos } = state
	const { type, payload } = action

	switch (type) {
		case types.GET: {
			return {
				...state,
				photos: payload,
			}
		}
		case types.ADD: {
			return {
				...state,
				photos: [payload, ...photos],
			}
		}
		case types.REMOVE: {
			return {
				...state,
				photos: photos.filter((todo, i) => i !== payload),
			}
		}
	}

	return state
}