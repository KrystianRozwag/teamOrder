export interface Products{
    name: string;
    restaurantName: string;
    price: number;
    dietType: {
        veganDiet: boolean;
        vegetarianDiet: boolean;
        lowCalorieDiet: boolean,
        lowFatDiet: boolean,
        lowCarbDiet: boolean,
    };
    allergType: {
        gluten: boolean;
        nuts: boolean;
        lactose: boolean;
        wheat: boolean;
        soy: boolean;
    };
    foodCategory: string;
}