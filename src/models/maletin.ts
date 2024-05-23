export class Maletin {

    constructor(public numero: number, public valor: number) {}

    static generarMaletines(): Maletin[] {
        const valores: number[] = [0.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000, 5000, 10000, 25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000];
        const maletines: Maletin[] = [];

        // Shuffle the values array to randomize the values
        for (let i = valores.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [valores[i], valores[j]] = [valores[j], valores[i]];
        }

        // Create Maletin instances with numbers 1 to 26 and the shuffled values
        for (let i = 0; i < 26; i++) {
        maletines.push(new Maletin(i + 1, valores[i]));
        }

        return maletines;
    }
}