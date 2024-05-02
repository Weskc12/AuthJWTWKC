const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//1.Definir un store (estado global) en flux para saber si hay un usuario logeado o no lo está.
			isLoggedIn: false,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			login: (token) =>{
				// 2. Definir las actions para cambiar de estado ese store y además para guardar o remover el token en el localStorage.
					setStore({isLoggedIn: true});
					localStorage.setItem("token", token); // como lo hemos puesto aquí, lo quito del backend
			},
			logout: () =>{
				setStore({isLoggedIn: false});
				localStorage.removeItem("token")
			},
			isLogged: () => {
				if (localStorage.getItem("token")){
					setStore({isLoggedIn: true})
				} 
				else {
					setStore({isLoggedIn: false})
				}
			},
			// Use getActions to call a function within a function
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
