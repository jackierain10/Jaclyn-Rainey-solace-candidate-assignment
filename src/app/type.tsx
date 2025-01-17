export interface Advocate {
    id: string,
    firstName: string,
    lastName: string,
    city: string,
    degree: string,
    specialties: string[] | string,
    yearsOfExperience: number,
    phoneNumber: number,
}

export interface NewAdvocate {
    firstName: string,
    lastName: string,
    city: string,
    degree: string,
    specialties: string[],
    yearsOfExperience: number,
    phoneNumber: number,
}