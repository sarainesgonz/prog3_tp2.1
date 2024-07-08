class Currency {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }
    
}

class CurrencyConverter {
    constructor(apiUrl, currencies = []) {
        this.apiUrl = apiUrl;
        this.currencies = currencies
    }
// DONE Método asíncrono que realiza una petición al endpoint `/currencies` de la API de Frankfurter para obtener la lista de códigos de monedas disponibles.
    async getCurrencies() {
        const response = await fetch("https://api.frankfurter.app/currencies");
        const dataCurrencies = await response.json();
        console.log(dataCurrencies)
    // Obtener los codigos: El método debe almacenar las monedas obtenidas en el atributo `currencies` como instancias de la clase `Currency`
        // dataCurrencies.forEach((code, name) => {
        //     this.currencies = new Currency(code, name)
        //     console.log(this.currencies)
        // })
       for (const code in dataCurrencies) {
        const name = dataCurrencies[code];
        const newCurrency = new Currency(code, name)
        console.log(newCurrency)
        this.currencies.push(newCurrency)
       }
       console.log(this.currencies)
    // no retorna nada
    }

    async convertCurrency(amount, fromCurrency, toCurrency) {
        const response = await fetch("https://api.frankfurter.app/latest")
        const data = await response.json();
        console.log(data)
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("conversion-form");
    const resultDiv = document.getElementById("result");
    const fromCurrencySelect = document.getElementById("from-currency");
    const toCurrencySelect = document.getElementById("to-currency");

    const converter = new CurrencyConverter("https://api.frankfurter.app");

    await converter.getCurrencies();
    populateCurrencies(fromCurrencySelect, converter.currencies);
    populateCurrencies(toCurrencySelect, converter.currencies);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const amount = document.getElementById("amount").value;
        const fromCurrency = converter.currencies.find(
            (currency) => currency.code === fromCurrencySelect.value
        );
        const toCurrency = converter.currencies.find(
            (currency) => currency.code === toCurrencySelect.value
        );

        const convertedAmount = await converter.convertCurrency(
            amount,
            fromCurrency,
            toCurrency
        );

        if (convertedAmount !== null && !isNaN(convertedAmount)) {
            resultDiv.textContent = `${amount} ${
                fromCurrency.code
            } son ${convertedAmount.toFixed(2)} ${toCurrency.code}`;
        } else {
            resultDiv.textContent = "Error al realizar la conversión.";
        }
    });

    function populateCurrencies(selectElement, currencies) {
        if (currencies) {
            currencies.forEach((currency) => {
                const option = document.createElement("option");
                option.value = currency.code;
                option.textContent = `${currency.code} - ${currency.name}`;
                selectElement.appendChild(option);
            });
        }
    }
});
