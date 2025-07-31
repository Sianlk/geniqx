import { startAdminCore } from "./empire_modules/AdminCore";
import { initMarketMint } from "./empire_modules/MarketMintAI";
import { initPayCoreX } from "./empire_modules/PayCoreX";
import { startNuvexa } from "./empire_modules/Nuvexa";
import { initTutorium } from "./empire_modules/Tutorium";

async function startGENIQXPlatform() {
  console.log("Starting GENIQX...");

  await startAdminCore();
  await initMarketMint();
  await initPayCoreX();
  await startNuvexa();
  await initTutorium();

  console.log("GENIQX launch complete.");
}

startGENIQXPlatform();
async function startGENIQXPlatform() {
  console.log("GENIQX kernel booting...");

  const startAdminCore = async () => {
    console.log("AdminCore module booted.");
  };

  const initMarketMint = async () => {
    console.log("MarketMintAI module booted.");
  };

  const initPayCoreX = async () => {
    console.log("PayCoreX module booted.");
  };

  const startNuvexa = async () => {
    console.log("Nuvexa diagnostics module booted.");
  };

  const initTutorium = async () => {
    console.log("Tutorium education engine booted.");
  };

  await startAdminCore();
  await initMarketMint();
  await initPayCoreX();
  await startNuvexa();
  await initTutorium();

  console.log("GENIQX core modules loaded.");
}

startGENIQXPlatform();
import { startAdminCore } from "./empire_modules/AdminCore";
import { initMarketMint } from "./empire_modules/MarketMintAI";
import { initPayCoreX } from "./empire_modules/PayCoreX";
import { startNuvexa } from "./empire_modules/Nuvexa";
import { initTutorium } from "./empire_modules/Tutorium";

async function startGENIQXPlatform() {
  console.log("Starting GENIQX...");

  await startAdminCore();
  await initMarketMint();
  await initPayCoreX();
  await startNuvexa();
  await initTutorium();

  console.log("GENIQX launch complete.");
}

startGENIQXPlatform();


