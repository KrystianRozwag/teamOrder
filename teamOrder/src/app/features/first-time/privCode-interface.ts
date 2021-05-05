export interface foodInterface {
    name: string;
  }
export interface PrivCodeData{
    dietType: string;
    allergics: {
        gluten: boolean;
        nuts: boolean;
        lactose: boolean;
        wheat: boolean;
        soy: boolean;
    };
    food: {
        meat: boolean;
        salads: boolean;
        pizza: boolean;
        pasta: boolean;
        burgers: boolean;
        sushi: boolean;
        soups: boolean;
    }
    teamCode: string;
    name: string;
}