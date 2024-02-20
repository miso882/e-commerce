import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { HTTP } from "../../regle";
import NavbarLeft from "../Categories/NavbarLeft";
import HeaderCategorie from "../Header/HeaderCategorie";
import Footer from "../Footer/Footer";

const CompatiblePage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [compatibleList, setCompatibleList] = useState([]);
	const [editCompatible, setEditCompatible] = useState([]);
	const [editColor, setEditColor] = useState("");
	const [editName, setEditName] = useState("");
	const [editDescribe, setEdtiDescribe] = useState("");
	const [newDescribe, setNewDescribe] = useState("");
	const [newCompatibleName, setNewCompatibleName] = useState("");
	const [newCompatibleValue, setNewCompatibleValue] = useState("");
	const [refresh, setRefresh] = useState(false);
	const [currentCompatible, setCurrentCompatible] = useState(0);
	const [created, setCreated] = useState(false);
	useEffect(() => {
		async function getCompatibleList() {
			const response = await axios.get(HTTP + "compatible");
			if (response.data) {
				setCompatibleList(response.data);
			}
			return;
		}
		getCompatibleList();
	}, [currentCompatible, created])
	useEffect(() => {
		async function getCompatibleById(idCompatible) {
			const response = await axios.get(HTTP + "compatible/" + idCompatible)
			if (response.data) {
				setEditCompatible(response.data);
				setEditColor(response.data.value);
				setEditName(response.data.name);
				setRefresh(true);
			}
		}
		if(id)
		getCompatibleById(id);
	}, [id])

	async function create() {
		const request = {
			name: newCompatibleName,
			value: newCompatibleValue,
			describe: newDescribe
		}
		if (newCompatibleName.length >= 3 && newCompatibleValue.length >= 3) {
			setCreated(true);
			const response = await axios.post(HTTP + "compatible", request)
			if (response.status === 201) {
				setNewCompatibleName("");
				setNewCompatibleValue("");
				setNewDescribe("");
				setCreated(false);
			}
		}
	}
	async function edit() {
		const request = {
			name: editName,
			value: editColor,
			describe: editDescribe
		}
		const response = await axios.put(HTTP + "compatible/" + id, request)
		setCurrentCompatible(0);
		setEditColor("");
		setEdtiDescribe("");
		setEditName("");
		navigate("/compatible");
	}
	async function deleteCompatible() {
		setCreated(true)
		const response = await axios.delete(HTTP + "compatible/" + currentCompatible)
		setCreated(false)
	}
	async function redirectUpdateCompatible() {
		navigate("/compatible/" + currentCompatible)
	}

	if (id) {
		return (
			<>
				<HeaderCategorie />
				<div className="flex">
					<NavbarLeft />
					{
						refresh === true  ? <>
							<div className="bg-white w-full m-0">
								<label className="pt-20 text-black ml-16">Modifier le nom de la compatibilité :</label>
								<input
									type="text"
									className="border border-gray-400 px-2 py-1 rounded mb-3 mx-14 w-1/2 my-7 text-black"
									onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
										editCompatible.name = e.target.value;
										setEditName(e.target.value);
									}}
									value={editCompatible.name}
								/>
								<br />
								<label className="pt-20 text-black ml-16">Modifier la description de la compatibilité :</label>
								<input
									type="text"
									className="border border-gray-400 px-2 py-1 rounded mb-3 mx-14 w-1/2 my-7 text-black"
									onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
										editCompatible.describe = e.target.value;
										setEdtiDescribe(e.target.value);
									}}
									value={editCompatible.describe}
								/>
								<br />
								<label className="pt-20 text-black ml-16">Modifier la couleur de la compatibilité :</label>
								<input
									type="color"
									className="border border-gray-400 px-2 py-1 rounded mb-3 mx-14 my-7 text-black"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										editCompatible.value = e.target.value;
										setEditColor(e.target.value);
									}}
									value={editCompatible.value}
								/>
								<br />
								<button className="bg-[#264ACB] rounded-lg h-12 w-28 mt-12 text-lg ml-16 cursor-pointer" type="submit" value="Valider" onClick={edit}>Valider</button>
							</div></> : <></>
					}

				</div>
			</>
		)
	} else {
		return (
			<>
				<div>
					<HeaderCategorie />
					<NavbarLeft />
					<div className="left-72 top-[150px] w-full bg-white absolute text-3xl font-normal">
						<label className="pt-20 text-black ml-16">Créer une nouvelle compatibilité :</label>
						<br/>
						<input
							type="text"
							placeholder="Nom de la nouvelle compatibilité"
							className="border border-gray-400 px-2 py-1 rounded mb-3 mx-14 w-3/6 my-7 text-black"
							onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
								setNewCompatibleName(e.target.value);
							}}
							value={newCompatibleName}
						/>
						<input
							type="text"
							placeholder="Description"
							className="border border-gray-400 px-2 py-1 rounded mb-3 mx-14 w-3/6 my-7 text-black"
							onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
								setNewDescribe(e.target.value);
							}}
							value={newDescribe}
						/>
						<br/>

						<input
							type="color"
							className="border border-gray-400 px-2 py-1 rounded mb-3 mx-14 my-7 text-black"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setNewCompatibleValue(e.target.value);
							}}
							value={newCompatibleValue}
						/>
						<button className="bg-[#264ACB] rounded-lg h-12 w-28 mt-12 text-lg ml-16 cursor-pointer" type="submit" value="Valider" onClick={create}>Valider</button>

						<div className="p-5 text-center">
							<select className="mr-60 bg-gray-200 border rounded p-2" onChange={(e) => { setCurrentCompatible(e.target.value) }}>
								<option className="border border-gray-400  px-2 py-1 rounded mb-3 mx-14 w-3/5 my-7" disabled selected
								>
									Liste des compatibilités
								</option>
								{
									compatibleList.map((item) => {
										return (
											<Fragment key={item.id}>
												<option className="border border-gray-400 bg-white px-2 py-1 rounded mb-3 mx-14 w-3/5 my-7" value={item.id}>
													{item.name + "   /  " + item.describe}
												</option>
											</Fragment>

										)
									})
								}
							</select>
							<input type="submit" onClick={redirectUpdateCompatible} value="Modifier" className="bg-[#264ACB] rounded-lg mr-12 h-12 w-28 text-lg text-white cursor-pointer" />
							<input type="submit" onClick={deleteCompatible} value="Supprimer" className="bg-[#B22222] rounded-lg h-12 w-28 text-lg text-white cursor-pointer" />
						</div>
					</div>

				</div>
			</>
		)
	}
};

export default CompatiblePage;