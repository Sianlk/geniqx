(async function () {
  console.log("GENIQX kernel booting...");

  async function startAdminCore() {
    console.log("AdminCore module booted.");
  }

  async function initMarketMint() {
    console.log("MarketMintAI module booted.");
  }

  async function initPayCoreX() {
    console.log("PayCoreX module booted.");
  }

  async function startNuvexa() {
    console.log("Nuvexa diagnostics module booted.");
  }

  async function initTutorium() {
    console.log("Tutorium education engine booted.");
  }

  await startAdminCore();
  await initMarketMint();
  await initPayCoreX();
  await startNuvexa();
  await initTutorium();

  console.log("✅ GENIQX core modules loaded.");
})();

