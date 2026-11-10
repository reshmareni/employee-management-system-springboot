
const API_URL = "/api/employees";

let employees = [];
let editingEmployeeId = null;

document.addEventListener("DOMContentLoaded", () => {
    loadEmployees();

    const form = document.getElementById("employeeForm");
    if (form) {
        form.addEventListener("submit", saveEmployee);
    }

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", renderEmployees);
    }
});

async function loadEmployees() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Could not load employees.");
        }

        employees = await response.json();
        renderEmployees();
        updateStatistics();
    } catch (error) {
        console.error(error);
        showMessage("Unable to load employees. Please check that the backend is running.", "danger");
    }
}

function renderEmployees() {
    const tableBody = document.getElementById("employeeTableBody");

    if (!tableBody) return;

    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";

    const filteredEmployees = employees.filter(employee => {
        const searchableText = [
            employee.firstName,
            employee.lastName,
            employee.email,
            employee.department
        ].join(" ").toLowerCase();

        return searchableText.includes(searchTerm);
    });

    tableBody.innerHTML = "";

    if (filteredEmployees.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4">
                    No employees found.
                </td>
            </tr>
        `;
        return;
    }

    filteredEmployees.forEach(employee => {
        const row = document.createElement("tr");

        const values = [
            employee.id,
            `${employee.firstName} ${employee.lastName}`,
            employee.email,
            employee.department || "-",
            employee.salary ?? "-"
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionsCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.className = "btn btn-sm btn-outline-primary me-2";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editEmployee(employee.id));

        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-sm btn-outline-danger";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteEmployee(employee.id));

        actionsCell.append(editButton, deleteButton);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    });
}

function updateStatistics() {
    const totalElement = document.getElementById("totalEmployees");
    const departmentElement = document.getElementById("totalDepartments");

    if (totalElement) {
        totalElement.textContent = employees.length;
    }

    if (departmentElement) {
        const departments = new Set(
            employees
                .map(employee => employee.department)
                .filter(department => department && department.trim())
        );

        departmentElement.textContent = departments.size;
    }
}

async function saveEmployee(event) {
    event.preventDefault();

    const employee = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value.trim(),
        salary: document.getElementById("salary").value
            ? Number(document.getElementById("salary").value)
            : null
    };

    const url = editingEmployeeId
        ? `${API_URL}/${editingEmployeeId}`
        : API_URL;

    const method = editingEmployeeId ? "PUT" : "POST";

    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Could not save employee.");
        }

        showMessage("Employee saved successfully!", "success");

        editingEmployeeId = null;
        document.getElementById("employeeForm").reset();

        closeEmployeeModal();
        await loadEmployees();

    } catch (error) {
        console.error(error);
        showMessage(error.message, "danger");
    }
}

function editEmployee(id) {
    const employee = employees.find(item => item.id === id);

    if (!employee) return;

    editingEmployeeId = id;

    document.getElementById("firstName").value = employee.firstName || "";
    document.getElementById("lastName").value = employee.lastName || "";
    document.getElementById("email").value = employee.email || "";
    document.getElementById("department").value = employee.department || "";
    document.getElementById("salary").value = employee.salary ?? "";

    const modalTitle = document.getElementById("employeeModalTitle");
    if (modalTitle) {
        modalTitle.textContent = "Edit Employee";
    }

    openEmployeeModal();
}

async function deleteEmployee(id) {
    const confirmed = confirm("Are you sure you want to delete this employee?");

    if (!confirmed) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Could not delete employee.");
        }

        showMessage("Employee deleted successfully!", "success");
        await loadEmployees();

    } catch (error) {
        console.error(error);
        showMessage(error.message, "danger");
    }
}

function openEmployeeModal() {
    const modalElement = document.getElementById("employeeModal");

    if (modalElement && window.bootstrap) {
        bootstrap.Modal.getOrCreateInstance(modalElement).show();
    }
}

function closeEmployeeModal() {
    const modalElement = document.getElementById("employeeModal");

    if (modalElement && window.bootstrap) {
        const modal = bootstrap.Modal.getInstance(modalElement);

        if (modal) {
            modal.hide();
        }
    }
}

function resetEmployeeForm() {
    editingEmployeeId = null;

    const form = document.getElementById("employeeForm");
    if (form) form.reset();

    const modalTitle = document.getElementById("employeeModalTitle");
    if (modalTitle) {
        modalTitle.textContent = "Add Employee";
    }
}

function showMessage(message, type) {
    const alertContainer = document.getElementById("alertContainer");

    if (!alertContainer) {
        console.log(message);
        return;
    }

    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${escapeHtml(message)}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}
