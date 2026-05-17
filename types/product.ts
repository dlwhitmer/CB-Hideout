export interface Product {
  id: number;                 // INTEGER PRIMARY KEY AUTOINCREMENT
  scryfall_id: string;        // TEXT NOT NULL UNIQUE
  name: string;               // TEXT NOT NULL
  set_code: string | null;    // TEXT (nullable)
  collector_number: string | null; // TEXT (nullable)
  rarity: string | null;      // TEXT (nullable)
  price: number | null;       // REAL (nullable)
  image_url: string | null;   // TEXT (nullable)
  type_line: string | null;   // TEXT (nullable)
  oracle_text: string | null; // TEXT (nullable)
  description: string | null; // TEXT (nullable)
  created_at?: string;        // DATETIME DEFAULT CURRENT_TIMESTAMP
}