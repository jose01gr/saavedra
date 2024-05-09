
class Vehicle {
    constructor(ownerName, ownerSurname, ownerId, ownerPhone, ownerAddress, vehiclePlate, vehicleBrand, vehicleModel, vehicleYear, vehicleColor, vehiclePic) {
        this.ownerName = ownerName;
        this.ownerSurname = ownerSurname;
        this.ownerId = ownerId;
        this.ownerPhone = ownerPhone;
        this.ownerAddress = ownerAddress;
        this.vehiclePlate = vehiclePlate;
        this.vehicleBrand = vehicleBrand;
        this.vehicleModel = vehicleModel;
        this.vehicleYear = vehicleYear;
        this.vehicleColor = vehicleColor;
        this.vehiclePic = vehiclePic
    }
}

class VehicleRegistry {
    constructor() {
        this.vehicles = [];
    }

    addVehicle(vehicle) {
        this.vehicles.push(vehicle);
        this.displayVehicles();
    }

    editVehicle(index, vehicle) {
        this.vehicles[index] = vehicle;
        this.displayVehicles();
    }
    deleteVehicle(index) {
        this.vehicles[index].pop()
        this.displayVehicles();
    }

    displayVehicles() {
        const vehicleTbody = document.getElementById('vehicleTbody');
        vehicleTbody.innerHTML = '';
        this.vehicles.forEach((vehicle, index) => {
            const tr = document.createElement('tr');
            Object.values(vehicle).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
            });
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => this.editVehiclePrompt(index));
            tr.appendChild(editButton);
            const deleteButton = document.createElement('button');
            editButton.textContent = 'Borrar';
            editButton.addEventListener('click', () => this.deleteVehicle(index));
            tr.appendChild(deleteButton);
            vehicleTbody.appendChild(tr);
        });
    }

    editVehiclePrompt(index) {
        const vehicle = this.vehicles[index];
        Object.keys(vehicle).forEach(key => {
            const input = document.getElementById(key);
            input.value = vehicle[key];
        });
        const form = document.getElementById('vehicleForm');
        const submitButton = form.querySelector('input[type="submit"]');
        submitButton.value = 'Editar';
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.editVehicle(index, this.getVehicleFromForm());
            submitButton.value = 'Registrar';
            form.reset();
        }, { once: true });
    }

    getVehicleFromForm() {
        const ownerName = document.getElementById('ownerName').value;
        const ownerSurname = document.getElementById('ownerSurname').value;
        const ownerId = document.getElementById('ownerId').value;
        const ownerPhone = document.getElementById('ownerPhone').value;
        const ownerAddress = document.getElementById('ownerAddress').value;
        const vehiclePlate = document.getElementById('vehiclePlate').value;
        const vehicleBrand = document.getElementById('vehicleBrand').value;
        const vehicleModel = document.getElementById('vehicleModel').value;
        const vehicleYear = document.getElementById('vehicleYear').value;
        const vehicleColor = document.getElementById('vehicleColor').value;
        return new Vehicle(ownerName, ownerSurname, ownerId, ownerPhone, ownerAddress, vehiclePlate, vehicleBrand, vehicleModel, vehicleYear, vehicleColor);
    }
}

var brandModelMap = {
    "Marca1": ["Modelo1", "Modelo2", "Modelo3"],
    "Marca2": ["Modelo4", "Modelo5", "Modelo6"],
    "Marca3": ["Modelo7", "Modelo8", "Modelo9"],
    "Marca4": ["Modelo10", "Modelo11", "Modelo12"],
    "Marca5": ["Modelo13", "Modelo14", "Modelo15"]
};


function updateModelOptions() {
    var brand = document.getElementById("vehicleBrand").value;
    var modelSelect = document.getElementById("vehicleModel");
    modelSelect.innerHTML = ""; // Clear existing options


    var models = brandModelMap[brand] ? brandModelMap[brand] : [];

    const optionsHTML = models.map(model => `<option value="${model}">${model}</option>`).join("");
    modelSelect.innerHTML = optionsHTML;
}

// Add a change event to the brand field to update model options
document.getElementById("vehicleBrand").addEventListener("change", updateModelOptions);

const vehicleRegistry = new VehicleRegistry();

document.getElementById('vehicleForm').addEventListener('submit', (event) => {
    event.preventDefault();
    vehicleRegistry.addVehicle(vehicleRegistry.getVehicleFromForm());
    event.target.reset();
});