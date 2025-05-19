from agents import legal_gpt, fusion_gpt, music_gpt
from builder import build_backend
from scraper import web_scrape
from admin_panel import mutation_trigger

class GeniAIR:
    def __init__(self):
        self.active_agents = [legal_gpt, fusion_gpt, music_gpt]

    def evolve(self):
        scraped_data = web_scrape.extract_trending_structures()
        anonymised = web_scrape.anonymise(scraped_data)
        for agent in self.active_agents:
            new_logic = agent.rebuild(anonymised)
            build_backend.deploy(new_logic)
        mutation_trigger.run_full_audit()

if __name__ == "__main__":
    core = GeniAIR()
    core.evolve()
