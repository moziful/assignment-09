export const getAllPets = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-pets`);
    const data = await response.json();
    return data;
}
export const allPets = getAllPets();