class Customer {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // DONE: una propiedad computada info que retorna una string del name y el email
    get info() {
        return `Titular de la resvera: ${this.name}, Email: ${this.email}`
    }
}

class Reservation {
    constructor(id, customer, date, guests){
        this.id = id;
        // this.customer = new Customer();
        this.customer = customer;
        this.date = new Date(date);
        this.guests = guests;
    }
    // DONE:propiedad computada `info` que retorne una cadena con la fecha y hora de la reserva, la información del cliente y el número de comensales.
    get info(){
        return `Titular de la reserva: ${this.customer.name}
                <br>
                Numero de comensales: ${this.guests}
                <br>
                Fecha de la reserva: ${this.date.toLocaleDateString()}
                <br>
                Hora de la reserva: ${this.date.toLocaleTimeString()}`
    }

    // DONE: implementar un método estático `validateReservation` que reciba un objeto con la información de la reserva
    static validateReservation(resoInfo) {
        const {id, customer, date, guests} = resoInfo;
        // DONE: Si la fecha de la reserva es anterior a la fecha actual y la cantidad de comensales es menor o igual a 0, la reserva no es válida.
        const resoDate = new Date(date);
        if ( resoDate < new Date() || guests <= 0 ) {
            return false
        }
        return true
    }
}

class Restaurant {
    constructor(name) {
        this.name = name;
        this.reservations = [];
    }

    addReservation(reservation) {
        this.reservations.push(reservation);
    }

    render() {
        const container = document.getElementById("reservations-list");
        container.innerHTML = "";
        this.reservations.forEach((reservation) => {
            const reservationCard = document.createElement("div");
            reservationCard.className = "box";
            reservationCard.innerHTML = `
                    <p class="subtitle has-text-primary">
                        Reserva ${
                            reservation.id
                        } - ${reservation.date.toLocaleString()}
                    </p>
                    <div class="card-content">
                        <div class="content">
                            <p>
                                ${reservation.info}
                            </p>
                        </div>
                    </div>
              `;
            container.appendChild(reservationCard);
        });
    }
}

document
    .getElementById("reservation-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const customerName = document.getElementById("customer-name").value;
        const customerEmail = document.getElementById("customer-email").value;
        const reservationDate =
            document.getElementById("reservation-date").value;
        const guests = parseInt(document.getElementById("guests").value);

        if (Reservation.validateReservation(reservationDate, guests)) {
            const customerId = restaurant.reservations.length + 1;
            const reservationId = restaurant.reservations.length + 1;

            const customer = new Customer(
                customerId,
                customerName,
                customerEmail
            );
            const reservation = new Reservation(
                reservationId,
                customer,
                reservationDate,
                guests
            );

            restaurant.addReservation(reservation);
            restaurant.render();
        } else {
            alert("Datos de reserva inválidos");
            return;
        }
    });

const restaurant = new Restaurant("El Lojal Kolinar");

const customer1 = new Customer(1, "Shallan Davar", "shallan@gmail.com");
const reservation1 = new Reservation(1, customer1, "2024-12-31T20:00:00", 4);

if (Reservation.validateReservation(reservation1.date, reservation1.guests)) {
    restaurant.addReservation(reservation1);
    restaurant.render();
} else {
    alert("Datos de reserva inválidos");
}
