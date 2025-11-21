# Data Structure

The data files have been organized into language-specific folders for better maintainability and performance.

## Structure

```
data/
├── en/                 # English data files
│   ├── site.json      # Site information (name, contact, hours, social)
│   ├── services.json  # Medical services
│   ├── doctors.json   # Doctor profiles
│   ├── departments.json # Medical departments
│   ├── testimonials.json # Patient testimonials
│   ├── stats.json     # Statistics
│   └── about.json     # About page content (mission, vision, values)
│
└── ar/                 # Arabic data files
    ├── site.json
    ├── services.json
    ├── doctors.json
    ├── departments.json
    ├── testimonials.json
    ├── stats.json
    └── about.json
```

## Benefits

- **Better Performance**: Load only the data you need
- **Easier Maintenance**: Update specific content without touching other data
- **Scalability**: Easy to add new languages or data types
- **Cleaner Code**: Smaller, focused JSON files

## Usage

The `DataLoader` module automatically loads the correct language files:

```javascript
// Get site information
const siteInfo = await DataLoader.getSiteInfo();

// Get services
const services = await DataLoader.getServices();

// Get doctors
const doctors = await DataLoader.getDoctors();

// Get about information
const about = await DataLoader.getAbout();
```

## Adding New Languages

1. Create a new folder: `data/[language-code]/`
2. Copy all JSON files from `en/` or `ar/`
3. Translate the content
4. Update `i18n.js` to include the new language
