interface RegisteredUser {
    name: string;
    surname: string;
    email: string;
    phone: string | null;
    password: string;
    pet: 'dog' | 'cat' | 'other';
    address: {
        city: string;
        street: string;
        building: string;
        flatNo: string | null;
    };
    consents: {
        newsletter: boolean;
        sms: boolean;
    } 
}