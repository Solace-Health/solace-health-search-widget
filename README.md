# Solace Search Widget

As displayed in the header of our [WebFlow](https://www.solace.health/) site. This form once submitted will trigger an analytics event before it redirects to our applications search page with the filters pre-applied. Filters include Location and Advocate Speciality.

### Install Dependencies

```bash
npm i
```

### Start the app

```bash
npm run dev
```

### Build the app

```bash
npm run build
```

### Releasing

1. Create a release in Github for next patch version.
2. Update the version reference of the script in Webflow.
3. Publish the site
