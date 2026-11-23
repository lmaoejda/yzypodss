module.exports = [
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/admin/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "009f44fc71f939d5b067a74bb74bd5adb4b8d60c5a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logoutAction"],
    "4064dd1abbb238a42185890e4d368c2730da238055",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteProductAction"],
    "40692563a8dc331f44013d53e6c439ccf3efb5f483",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createProductAction"],
    "40777bc69ce3c2a0a1cfd8caa6eeb255c48ef31bd9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["importProductsAction"],
    "4078a95100f9f021914f96340aa891c03e863756e3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["retryImageAction"],
    "600a1af5c8a11ff736ebb9a425f7da74c59201cd7e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toggleActiveAction"],
    "607b1e6d6c587e997c95a599d3325f8885a66fe4c5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePriceAction"],
    "60b710bcae6bcb17ad9c2b62bd838f1d09ef6b4bc5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loginAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/admin/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/admin/actions.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/admin/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/admin/actions.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/admin/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
/* __next_internal_action_entry_do_not_use__ [{"009f44fc71f939d5b067a74bb74bd5adb4b8d60c5a":{"name":"logoutAction"},"4064dd1abbb238a42185890e4d368c2730da238055":{"name":"deleteProductAction"},"40692563a8dc331f44013d53e6c439ccf3efb5f483":{"name":"createProductAction"},"40777bc69ce3c2a0a1cfd8caa6eeb255c48ef31bd9":{"name":"importProductsAction"},"4078a95100f9f021914f96340aa891c03e863756e3":{"name":"retryImageAction"},"600a1af5c8a11ff736ebb9a425f7da74c59201cd7e":{"name":"toggleActiveAction"},"607b1e6d6c587e997c95a599d3325f8885a66fe4c5":{"name":"updatePriceAction"},"60b710bcae6bcb17ad9c2b62bd838f1d09ef6b4bc5":{"name":"loginAction"}},"src/app/admin/actions.ts",""] */ __turbopack_context__.s([
    "createProductAction",
    ()=>createProductAction,
    "deleteProductAction",
    ()=>deleteProductAction,
    "importProductsAction",
    ()=>importProductsAction,
    "loginAction",
    ()=>loginAction,
    "logoutAction",
    ()=>logoutAction,
    "retryImageAction",
    ()=>retryImageAction,
    "toggleActiveAction",
    ()=>toggleActiveAction,
    "updatePriceAction",
    ()=>updatePriceAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$bootstrap$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/bootstrap.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$pipeline$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/image-pipeline.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$bootstrap$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$pipeline$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$bootstrap$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$pipeline$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
function parseProductImport(text) {
    if (text.length > 100_000) {
        return {
            products: null,
            error: "El archivo supera el límite de 100 KB."
        };
    }
    const rows = text.split(/\r?\n/).map((raw, index)=>({
            raw: raw.trim(),
            line: index + 1
        })).filter(({ raw })=>raw && !raw.startsWith("#"));
    if (rows.length === 0) {
        return {
            products: null,
            error: "El archivo no contiene productos."
        };
    }
    if (rows.length > 50) {
        return {
            products: null,
            error: "Podés importar hasta 50 productos por archivo."
        };
    }
    const imported = [];
    const seen = new Set();
    const errors = [];
    for (const { raw, line } of rows){
        const fields = raw.split("|").map((field)=>field.trim());
        if (fields.length !== 5) {
            errors.push(`Línea ${line}: deben ser 5 campos separados por |.`);
            continue;
        }
        const [rawBrand, rawModel, rawPuffs, rawPrice, rawFlavors] = fields;
        const brand = rawBrand.toUpperCase();
        const model = rawModel.toUpperCase();
        const puffs = Number(rawPuffs.replace(/\D/g, ""));
        const priceArs = Number(rawPrice.replace(/\D/g, ""));
        const flavors = Array.from(new Set(rawFlavors.split(",").map((flavor)=>flavor.trim()).filter(Boolean)));
        if (!brand || brand.length > 40) errors.push(`Línea ${line}: marca obligatoria (máximo 40 caracteres).`);
        if (!model || model.length > 40) errors.push(`Línea ${line}: modelo obligatorio (máximo 40 caracteres).`);
        if (!Number.isSafeInteger(puffs) || puffs < 1 || puffs > 2_147_483_647) {
            errors.push(`Línea ${line}: puffs debe ser un entero mayor a 0.`);
        }
        if (!Number.isSafeInteger(priceArs) || priceArs < 1 || priceArs > 100_000_000) {
            errors.push(`Línea ${line}: precio debe ser un entero entre 1 y 100.000.000.`);
        }
        if (flavors.length === 0 || flavors.length > 20 || flavors.some((flavor)=>flavor.length > 80)) {
            errors.push(`Línea ${line}: indicá entre 1 y 20 sabores (máximo 80 caracteres cada uno).`);
        }
        const key = `${brand.toLocaleLowerCase("es-AR")}|${model.toLocaleLowerCase("es-AR")}`;
        if (seen.has(key)) errors.push(`Línea ${line}: marca y modelo repetidos en el archivo.`);
        seen.add(key);
        imported.push({
            brand,
            model,
            puffs,
            priceArs,
            flavors,
            line
        });
    }
    if (errors.length > 0) {
        const displayedErrors = errors.slice(0, 8).join(" ");
        const remaining = errors.length - 8;
        return {
            products: null,
            error: `${displayedErrors}${remaining > 0 ? ` Y ${remaining} error(es) más.` : ""}`
        };
    }
    return {
        products: imported,
        error: null
    };
}
function refresh() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
}
async function loginAction(_prev, formData) {
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifyCredentials"])(email, password)) {
        await new Promise((r)=>setTimeout(r, 700)); // slow down brute force
        return {
            error: "Email o contraseña incorrectos."
        };
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSession"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admin");
}
async function logoutAction() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["destroySession"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admin/login");
}
async function createProductAction(formData) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])();
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$bootstrap$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureDb"])();
    const brand = String(formData.get("brand") ?? "").trim().toUpperCase();
    const model = String(formData.get("model") ?? "").trim().toUpperCase();
    const puffs = Number(String(formData.get("puffs") ?? "").replace(/\D/g, ""));
    const price = Number(String(formData.get("price") ?? "").replace(/\D/g, ""));
    const flavors = Array.from(new Set(formData.getAll("flavors").map((f)=>String(f).trim()).filter(Boolean))).slice(0, 20);
    if (!brand || brand.length > 40) return {
        ok: false,
        message: "Completá la marca."
    };
    if (!model || model.length > 40) return {
        ok: false,
        message: "Completá el modelo."
    };
    if (!Number.isInteger(puffs) || puffs < 1) {
        return {
            ok: false,
            message: "Los puffs tienen que ser un número mayor a 0."
        };
    }
    if (!Number.isInteger(price) || price < 1) {
        return {
            ok: false,
            message: "El precio tiene que ser un número mayor a 0."
        };
    }
    if (flavors.length === 0) {
        return {
            ok: false,
            message: "Agregá al menos un sabor (Enter para sumar)."
        };
    }
    const [created] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"]).values({
        brand,
        model,
        puffs,
        priceArs: price,
        flavors,
        renderMode: "color",
        active: true
    }).returning({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].id
    });
    // Automatic pipeline: image search -> download -> store -> 3D texture.
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$pipeline$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["runImageAutomation"])({
        id: created.id,
        brand,
        model
    });
    refresh();
    if (result.status === "image_found") {
        return {
            ok: true,
            message: `✅ ${brand} ${model} publicado con imagen y modelo 3D automático.`
        };
    }
    return {
        ok: true,
        message: `✅ ${brand} ${model} publicado con modelo 3D del color del sabor. (${result.detail})`
    };
}
async function importProductsAction(text) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])();
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$bootstrap$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureDb"])();
    const parsed = parseProductImport(text);
    if (!parsed.products) return {
        ok: false,
        message: parsed.error
    };
    const existingRows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].select({
        brand: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].brand,
        model: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].model
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"]);
    const existing = new Set(existingRows.map(({ brand, model })=>`${brand.toLocaleLowerCase("es-AR")}|${model.toLocaleLowerCase("es-AR")}`));
    const duplicates = parsed.products.filter((item)=>existing.has(`${item.brand.toLocaleLowerCase("es-AR")}|${item.model.toLocaleLowerCase("es-AR")}`));
    if (duplicates.length > 0) {
        const names = duplicates.slice(0, 5).map((item)=>`${item.brand} ${item.model} (línea ${item.line})`).join(", ");
        const remaining = duplicates.length - 5;
        return {
            ok: false,
            message: `Ya existen: ${names}${remaining > 0 ? ` y ${remaining} más` : ""}. No se importó ningún producto.`
        };
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"]).values(parsed.products.map(({ brand, model, puffs, priceArs, flavors })=>({
            brand,
            model,
            puffs,
            priceArs,
            flavors,
            renderMode: "color",
            active: true
        })));
    refresh();
    return {
        ok: true,
        message: `${parsed.products.length} producto(s) agregados y publicados. El modelo 3D de color se genera automáticamente; podés buscar una imagen desde la tabla de productos.`
    };
}
async function updatePriceAction(id, price) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])();
    if (!Number.isInteger(price) || price < 1 || price > 100_000_000) {
        return {
            ok: false,
            message: "Precio inválido."
        };
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"]).set({
        priceArs: price
    }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].id, id));
    refresh();
    return {
        ok: true,
        message: "Precio actualizado."
    };
}
async function toggleActiveAction(id, active) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])();
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"]).set({
        active
    }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].id, id));
    refresh();
    return {
        ok: true,
        message: active ? "Producto activo." : "Producto sin stock."
    };
}
async function deleteProductAction(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])();
    const [row] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].select({
        imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].imageUrl
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].id, id)).limit(1);
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].id, id));
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$pipeline$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteStoredImage"])(row?.imageUrl ?? null);
    refresh();
    return {
        ok: true,
        message: "Producto eliminado."
    };
}
async function retryImageAction(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])();
    const [row] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].id, id)).limit(1);
    if (!row) return {
        ok: false,
        message: "Producto no encontrado."
    };
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$pipeline$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["runImageAutomation"])({
        id: row.id,
        brand: row.brand,
        model: row.model
    });
    refresh();
    return {
        ok: result.status === "image_found",
        message: result.status === "image_found" ? "Imagen encontrada y aplicada al modelo 3D." : `Sin imagen: ${result.detail}`
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    loginAction,
    logoutAction,
    createProductAction,
    importProductsAction,
    updatePriceAction,
    toggleActiveAction,
    deleteProductAction,
    retryImageAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(loginAction, "60b710bcae6bcb17ad9c2b62bd838f1d09ef6b4bc5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logoutAction, "009f44fc71f939d5b067a74bb74bd5adb4b8d60c5a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createProductAction, "40692563a8dc331f44013d53e6c439ccf3efb5f483", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(importProductsAction, "40777bc69ce3c2a0a1cfd8caa6eeb255c48ef31bd9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePriceAction, "607b1e6d6c587e997c95a599d3325f8885a66fe4c5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleActiveAction, "600a1af5c8a11ff736ebb9a425f7da74c59201cd7e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteProductAction, "4064dd1abbb238a42185890e4d368c2730da238055", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(retryImageAction, "4078a95100f9f021914f96340aa891c03e863756e3", null);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/db/bootstrap.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "SEED_PRODUCTS",
    ()=>SEED_PRODUCTS,
    "ensureDb",
    ()=>ensureDb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
/**
 * Idempotent bootstrap: creates tables (if missing) and seeds the base catalog
 * exactly once. This makes `npm install && npm run dev` work on any empty
 * Postgres (local or Supabase) with no extra step.
 */ const DDL = `
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand text NOT NULL,
  model text NOT NULL,
  puffs integer NOT NULL,
  price_ars integer NOT NULL,
  flavors text[] NOT NULL DEFAULT '{}'::text[],
  image_url text,
  render_mode text NOT NULL DEFAULT 'color',
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type text NOT NULL,
  data bytea NOT NULL,
  source_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS image_search_cache (
  query text PRIMARY KEY,
  image_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS automation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  product_id uuid,
  product_label text NOT NULL,
  status text NOT NULL,
  detail text
);
CREATE TABLE IF NOT EXISTS app_meta (
  key text PRIMARY KEY,
  value text NOT NULL
);
`;
const SEED_PRODUCTS = [
    {
        brand: "ELFBAR",
        model: "BC 15K",
        puffs: 15000,
        priceArs: 16000,
        flavors: [
            "Strawberry Kiwi",
            "Strawberry Water"
        ]
    },
    {
        brand: "LOST MARY",
        model: "DURA 35K",
        puffs: 35000,
        priceArs: 21000,
        flavors: [
            "Grapefruit Pass",
            "Pome Cherry Pineapple"
        ]
    },
    {
        brand: "ELFBAR",
        model: "DISP 30K",
        puffs: 30000,
        priceArs: 23000,
        flavors: [
            "Bubbaloo Tutti",
            "Pineapple Ice"
        ]
    },
    {
        brand: "IGNITE",
        model: "VMIX 40K",
        puffs: 40000,
        priceArs: 25000,
        flavors: [
            "New Pineapple + Passion Fruit",
            "New Kiwi Passion Guava Ice + Strawberry Ice"
        ]
    },
    {
        brand: "BLACK SHEEP",
        model: "55K",
        puffs: 55000,
        priceArs: 27000,
        flavors: [
            "Mixed Berry"
        ]
    }
];
async function run() {
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pool"].query(DDL);
    const client = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pool"].connect();
    try {
        await client.query("BEGIN");
        await client.query("SELECT pg_advisory_xact_lock(727301)");
        const seeded = await client.query("SELECT 1 FROM app_meta WHERE key = 'seeded'");
        if (seeded.rowCount === 0) {
            const count = await client.query("SELECT count(*)::int AS n FROM products");
            if (count.rows[0].n === 0) {
                for (const p of SEED_PRODUCTS){
                    await client.query(`INSERT INTO products (brand, model, puffs, price_ars, flavors, render_mode, active)
             VALUES ($1, $2, $3, $4, $5, 'color', true)`, [
                        p.brand,
                        p.model,
                        p.puffs,
                        p.priceArs,
                        p.flavors
                    ]);
                }
            }
            await client.query("INSERT INTO app_meta (key, value) VALUES ('seeded', 'true') ON CONFLICT DO NOTHING");
        }
        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally{
        client.release();
    }
}
const g = globalThis;
function ensureDb() {
    if (!g.__yeezyBootstrap) {
        g.__yeezyBootstrap = run().catch((error)=>{
            g.__yeezyBootstrap = undefined;
            throw error;
        });
    }
    return g.__yeezyBootstrap;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/db/index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "db",
    ()=>db,
    "pool",
    ()=>pool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/node-postgres/driver.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
}
const globalForDb = globalThis;
// Supabase (and most hosted Postgres providers) require TLS.
const needsSsl = /supabase\.(co|com)|pooler\.supabase|sslmode=require/i.test(databaseUrl);
const pool = globalForDb.__yeezyPool ?? new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["Pool"]({
    connectionString: databaseUrl,
    max: 5,
    ssl: needsSsl ? {
        rejectUnauthorized: false
    } : undefined
});
if ("TURBOPACK compile-time truthy", 1) {
    globalForDb.__yeezyPool = pool;
}
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["drizzle"])(pool, {
    schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/db/schema.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appMeta",
    ()=>appMeta,
    "automationLogs",
    ()=>automationLogs,
    "imageSearchCache",
    ()=>imageSearchCache,
    "productImages",
    ()=>productImages,
    "products",
    ()=>products
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/boolean.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$custom$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/custom.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/integer.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/text.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/timestamp.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/uuid.js [app-rsc] (ecmascript)");
;
;
const bytea = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$custom$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["customType"])({
    dataType () {
        return "bytea";
    }
});
const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pgTable"])("products", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["uuid"])("id").primaryKey().defaultRandom(),
    brand: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("brand").notNull(),
    model: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("model").notNull(),
    puffs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"])("puffs").notNull(),
    priceArs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"])("price_ars").notNull(),
    flavors: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("flavors").array().notNull().default(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`'{}'::text[]`),
    imageUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("image_url"),
    renderMode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("render_mode").notNull().default("color"),
    active: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["boolean"])("active").notNull().default(true),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timestamp"])("created_at", {
        withTimezone: true
    }).notNull().defaultNow()
});
const productImages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pgTable"])("product_images", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["uuid"])("id").primaryKey().defaultRandom(),
    contentType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("content_type").notNull(),
    data: bytea("data").notNull(),
    sourceUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("source_url"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timestamp"])("created_at", {
        withTimezone: true
    }).notNull().defaultNow()
});
const imageSearchCache = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pgTable"])("image_search_cache", {
    query: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("query").primaryKey(),
    imageUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("image_url").notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timestamp"])("created_at", {
        withTimezone: true
    }).notNull().defaultNow()
});
const automationLogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pgTable"])("automation_logs", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["uuid"])("id").primaryKey().defaultRandom(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timestamp"])("created_at", {
        withTimezone: true
    }).notNull().defaultNow(),
    productId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$uuid$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["uuid"])("product_id"),
    productLabel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("product_label").notNull(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("status").notNull(),
    detail: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("detail")
});
const appMeta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pgTable"])("app_meta", {
    key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("key").primaryKey(),
    value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"])("value").notNull()
});
}),
"[project]/src/lib/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authConfigured",
    ()=>authConfigured,
    "createSession",
    ()=>createSession,
    "destroySession",
    ()=>destroySession,
    "isAdmin",
    ()=>isAdmin,
    "requireAdmin",
    ()=>requireAdmin,
    "verifyCredentials",
    ()=>verifyCredentials
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/sign.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/verify.js [app-rsc] (ecmascript)");
;
;
;
;
;
/**
 * Minimal single-admin auth: only ADMIN_EMAIL + ADMIN_PASSWORD can sign in.
 * The session is a signed, httpOnly JWT cookie. Every admin Server Action
 * calls requireAdmin() again, so protection never relies on the UI alone.
 */ const COOKIE = "yeezy_admin";
const MAX_AGE = 60 * 60 * 24 * 7;
function secretKey() {
    const secret = process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD;
    if (!secret) return null;
    return new TextEncoder().encode(`yeezy-pods:${secret}`);
}
function adminEmail() {
    return (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
}
function digest(value) {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHash"])("sha256").update(value).digest();
}
function authConfigured() {
    return Boolean(adminEmail() && process.env.ADMIN_PASSWORD && secretKey());
}
function verifyCredentials(email, password) {
    if (!authConfigured()) return false;
    const emailOk = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["timingSafeEqual"])(digest(email.trim().toLowerCase()), digest(adminEmail()));
    const passOk = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["timingSafeEqual"])(digest(password), digest(process.env.ADMIN_PASSWORD));
    return emailOk && passOk;
}
async function createSession() {
    const key = secretKey();
    if (!key) throw new Error("Auth is not configured");
    const token = await new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SignJWT"]({
        email: adminEmail()
    }).setProtectedHeader({
        alg: "HS256"
    }).setIssuedAt().setExpirationTime(`${MAX_AGE}s`).sign(key);
    const store = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    store.set(COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: ("TURBOPACK compile-time value", "development") === "production",
        path: "/",
        maxAge: MAX_AGE
    });
}
async function destroySession() {
    const store = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    store.delete(COOKIE);
}
async function isAdmin() {
    const key = secretKey();
    if (!key) return false;
    const token = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).get(COOKIE)?.value;
    if (!token) return false;
    try {
        const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtVerify"])(token, key);
        return typeof payload.email === "string" && payload.email.toLowerCase() === adminEmail();
    } catch  {
        return false;
    }
}
async function requireAdmin() {
    if (!await isAdmin()) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admin/login");
}
}),
"[project]/src/lib/image-pipeline.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "deleteStoredImage",
    ()=>deleteStoredImage,
    "runImageAutomation",
    ()=>runImageAutomation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$sharp__$5b$external$5d$__$28$sharp$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$sharp$29$__ = __turbopack_context__.i("[externals]/sharp [external] (sharp, esm_import, [project]/node_modules/sharp)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$bootstrap$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/bootstrap.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$sharp__$5b$external$5d$__$28$sharp$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$sharp$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$bootstrap$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$sharp__$5b$external$5d$__$28$sharp$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$sharp$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$bootstrap$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
/**
 * Automatic image pipeline (runs server-side only):
 *  1. builds queries "{brand} {model} vape"
 *  2. asks SerpApi (Google Images) - max 2 retries, 15s timeout per request
 *  3. validates candidates (https, image content-type, >= 400px)
 *  4. downloads + normalizes the image and stores it in Postgres, served from
 *     /api/images/<id> (same origin -> no CORS problems for Three.js)
 *  5. any failure ends in a "color" fallback: the product is still published.
 */ const SEARCH_TIMEOUT_MS = 15_000;
const DOWNLOAD_TIMEOUT_MS = 12_000;
const MAX_RETRIES = 2;
const MIN_SIDE = 400;
const MAX_BYTES = 8 * 1024 * 1024;
const MAX_CANDIDATES = 8;
const CACHE_DAYS = 30;
class ApiError extends Error {
}
const sleep = (ms)=>new Promise((r)=>setTimeout(r, ms));
function isPrivateHost(hostname) {
    const h = hostname.toLowerCase();
    if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal")) {
        return true;
    }
    if (/^\d+\.\d+\.\d+\.\d+$/.test(h)) {
        const [a, b] = h.split(".").map(Number);
        return a === 10 || a === 127 || a === 0 || a === 169 && b === 254 || a === 172 && b >= 16 && b <= 31 || a === 192 && b === 168;
    }
    return h.includes(":");
}
function isSafeHttps(raw) {
    try {
        const u = new URL(raw);
        return u.protocol === "https:" && !isPrivateHost(u.hostname);
    } catch  {
        return false;
    }
}
async function searchImages(query) {
    const key = process.env.SERPAPI_KEY;
    if (!key) throw new ApiError("SERPAPI_KEY no configurada");
    if (process.env.SIMULATE_IMAGE_API_FAILURE === "1") {
        throw new ApiError("Fallo simulado de la API (SIMULATE_IMAGE_API_FAILURE=1)");
    }
    const url = new URL("https://serpapi.com/search.json");
    url.searchParams.set("engine", "google_images");
    url.searchParams.set("q", query);
    url.searchParams.set("api_key", key);
    url.searchParams.set("safe", "active");
    url.searchParams.set("hl", "es");
    let lastError;
    for(let attempt = 0; attempt <= MAX_RETRIES; attempt += 1){
        try {
            const res = await fetch(url, {
                signal: AbortSignal.timeout(SEARCH_TIMEOUT_MS),
                cache: "no-store"
            });
            const json = await res.json().catch(()=>null);
            if (json?.error && /hasn't returned any results/i.test(json.error)) {
                return [];
            }
            if (!res.ok || !json || json.error) {
                throw new Error(json?.error || `HTTP ${res.status}`);
            }
            const results = json.images_results ?? [];
            return results.filter((r)=>r.original && (r.original_width ?? MIN_SIDE) >= MIN_SIDE && (r.original_height ?? MIN_SIDE) >= MIN_SIDE).map((r)=>r.original).filter(isSafeHttps);
        } catch (error) {
            lastError = error;
            if (attempt < MAX_RETRIES) await sleep(600 * (attempt + 1));
        }
    }
    throw new ApiError(lastError instanceof Error ? lastError.message : "Error desconocido de API");
}
async function downloadAndValidate(url) {
    try {
        const res = await fetch(url, {
            signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS),
            redirect: "follow",
            headers: {
                "user-agent": "Mozilla/5.0 (compatible; YeezyPodsBot/1.0)"
            },
            cache: "no-store"
        });
        if (!res.ok) return null;
        if (res.url && !isSafeHttps(res.url)) return null;
        const type = (res.headers.get("content-type") || "").toLowerCase();
        if (!type.startsWith("image/") || type.includes("svg")) return null;
        const length = Number(res.headers.get("content-length") || 0);
        if (length > MAX_BYTES) return null;
        const raw = Buffer.from(await res.arrayBuffer());
        if (raw.length === 0 || raw.length > MAX_BYTES) return null;
        const meta = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$sharp__$5b$external$5d$__$28$sharp$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$sharp$29$__["default"])(raw).metadata();
        if (!meta.width || !meta.height) return null;
        if (meta.width < MIN_SIDE || meta.height < MIN_SIDE) return null;
        // Normalize: max 900px, white background, JPEG -> small & WebGL friendly.
        const data = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$sharp__$5b$external$5d$__$28$sharp$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$sharp$29$__["default"])(raw).rotate().resize({
            width: 900,
            height: 900,
            fit: "inside",
            withoutEnlargement: true
        }).flatten({
            background: "#ffffff"
        }).jpeg({
            quality: 82,
            mozjpeg: true
        }).toBuffer();
        return {
            data,
            contentType: "image/jpeg"
        };
    } catch  {
        return null;
    }
}
async function cachedImage(query) {
    const since = new Date(Date.now() - CACHE_DAYS * 86_400_000);
    const [hit] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["imageSearchCache"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["imageSearchCache"].query, query), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gt"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["imageSearchCache"].createdAt, since))).limit(1);
    if (!hit) return null;
    const id = hit.imageUrl.split("/").pop();
    if (!id) return null;
    const [img] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].select({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["productImages"].id
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["productImages"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["productImages"].id, id)).limit(1);
    return img ? hit.imageUrl : null;
}
async function findImage(ref) {
    const queries = [
        `${ref.brand} ${ref.model} vape`,
        `${ref.brand} ${ref.model} disposable vape`
    ];
    let apiFailure = null;
    for (const query of queries){
        const cached = await cachedImage(query);
        if (cached) {
            return {
                status: "image_found",
                imageUrl: cached,
                detail: `Cache: "${query}"`
            };
        }
        let candidates;
        try {
            candidates = await searchImages(query);
        } catch (error) {
            apiFailure = error instanceof Error ? error.message : "Error de API";
            break; // API is down: do not hammer it with the next query
        }
        for (const candidate of candidates.slice(0, MAX_CANDIDATES)){
            const img = await downloadAndValidate(candidate);
            if (!img) continue;
            const [stored] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["productImages"]).values({
                data: img.data,
                contentType: img.contentType,
                sourceUrl: candidate
            }).returning({
                id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["productImages"].id
            });
            const imageUrl = `/api/images/${stored.id}`;
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["imageSearchCache"]).values({
                query,
                imageUrl
            }).onConflictDoUpdate({
                target: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["imageSearchCache"].query,
                set: {
                    imageUrl,
                    createdAt: new Date()
                }
            });
            return {
                status: "image_found",
                imageUrl,
                detail: `Query: "${query}"`
            };
        }
    }
    if (apiFailure) {
        return {
            status: "api_error",
            imageUrl: null,
            detail: `${apiFailure}. Publicado con modelo de color.`
        };
    }
    return {
        status: "color_fallback",
        imageUrl: null,
        detail: "Sin imágenes válidas (https, imagen, >=400px). Publicado con modelo de color."
    };
}
function imageIdFromUrl(url) {
    if (!url || !url.startsWith("/api/images/")) return null;
    return url.split("/").pop() ?? null;
}
async function runImageAutomation(ref) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$bootstrap$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureDb"])();
    let result;
    try {
        result = await findImage(ref);
    } catch (error) {
        result = {
            status: "api_error",
            imageUrl: null,
            detail: `${error instanceof Error ? error.message : "Error inesperado"}. Publicado con modelo de color.`
        };
    }
    try {
        const [current] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].select({
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].imageUrl
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].id, ref.id)).limit(1);
        if (result.imageUrl) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"]).set({
                imageUrl: result.imageUrl,
                renderMode: "texture"
            }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].id, ref.id));
        } else if (!current?.imageUrl) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"]).set({
                imageUrl: null,
                renderMode: "color"
            }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].id, ref.id));
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["automationLogs"]).values({
            productId: ref.id,
            productLabel: `${ref.brand} ${ref.model}`,
            status: result.status,
            detail: result.detail
        });
    } catch (error) {
        console.error("[image-pipeline] could not persist result", error);
    }
    return result;
}
async function deleteStoredImage(imageUrl) {
    const id = imageIdFromUrl(imageUrl);
    if (!id) return;
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["imageSearchCache"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["imageSearchCache"].imageUrl, imageUrl));
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["productImages"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["productImages"].id, id));
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1a9_iht5b4o2g._.js.map