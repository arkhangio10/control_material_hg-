import os

# Define la ruta base
base_path = r"C:\Users\ASUS\Desktop\abel\control_materiales\gestion-obras\src"

# Define la estructura de carpetas
estructura = [
    "assets",
    "components/common",
    "components/auth",
    "components/inventario",
    "components/personal",
    "components/proyectos",
    "components/movimientos",
    "context",
    "firebase",
    "hooks",
    "layouts",
    "pages",
    "services",
    "utils",
]

# Crea las carpetas
for carpeta in estructura:
    ruta_completa = os.path.join(base_path, carpeta)
    os.makedirs(ruta_completa, exist_ok=True)
    print(f"Carpeta creada: {ruta_completa}")

# Crea el archivo App.js vacío
app_js_path = os.path.join(base_path, "App.js")
if not os.path.exists(app_js_path):
    with open(app_js_path, "w") as f:
        f.write("// Componente principal App.js\n")
    print(f"Archivo creado: {app_js_path}")
else:
    print(f"El archivo {app_js_path} ya existe.")

print("Estructura de carpetas creada correctamente.")
