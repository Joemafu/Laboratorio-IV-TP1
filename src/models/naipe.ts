export class Naipe {
    public palo!: string;
    public numero!: string;
    public valor!: number;

    constructor(palo: string, numero: string, valor: number) {
        this.palo = palo;
        this.numero = numero;
        this.valor = valor;
    }

    public static esMayorOIgual(ultimoNaipe:Naipe, naipeNuevo: Naipe): boolean {
        return naipeNuevo.valor >= ultimoNaipe.valor;
    }

    public static esMenorOIgual(ultimoNaipe:Naipe, naipeNuevo: Naipe): boolean {
        return naipeNuevo.valor <= ultimoNaipe.valor;
    }

    public static barajar(): Naipe[] {
        const palos = ['Picas', 'Tréboles', 'Diamantes', 'Corazones'];
        const valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'As'];
        const baraja: Naipe[] = [];
    
        // Generar cada carta de la baraja
        for (const palo of palos) {
            for (const valor of valores) {
                const naipe = new Naipe(palo, valor, valores.indexOf(valor) + 2);
                baraja.push(naipe);
            }
        }
    
        // Barajar
        for (let i = baraja.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [baraja[i], baraja[j]] = [baraja[j], baraja[i]];
        }
    
        return baraja;
    }

    public static tomarCarta(baraja: Naipe[]): Naipe | undefined {
        console.log ('Quedan ' + baraja.length + ' cartas en la baraja');
        return baraja.pop();   
    }
}