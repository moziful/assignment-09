export const getAllPets = async () => {
    const response = await fetch('http://localhost:5000/all-pets');
    const data = await response.json();
    return data;
}
export const allPets = getAllPets();