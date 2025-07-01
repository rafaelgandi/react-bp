# Shell React Boilerplate Generator - API Documentation

## Overview

The Shell React Boilerplate Generator is a command-line tool that automatically generates boilerplate files for React/Preact components. It provides two main scripts with slightly different configurations for different project setups.

## Table of Contents

- [Installation](#installation)
- [Public APIs](#public-apis)
  - [rbps.sh](#rbpssh)
  - [xrbps.sh](#xrbpssh)
- [Functions](#functions)
  - [generate_string()](#generate_string)
- [Generated File Structure](#generated-file-structure)
- [Usage Examples](#usage-examples)
- [Error Handling](#error-handling)
- [Configuration](#configuration)

---

## Installation

### Prerequisites
- Bash shell environment
- OpenSSL (for random string generation)
- Write permissions in target directories

### Setup Instructions

1. **Grant executable permissions:**
   ```bash
   chmod +x ./rbps.sh
   chmod +x ./xrbps.sh
   ```

2. **Add alias to shell configuration:**
   
   For `.zshrc`:
   ```bash
   echo 'alias rbps="/absolute/path/to/your/rbps.sh"' >> ~/.zshrc
   echo 'alias xrbps="/absolute/path/to/your/xrbps.sh"' >> ~/.zshrc
   ```
   
   For `.bashrc`:
   ```bash
   echo 'alias rbps="/absolute/path/to/your/rbps.sh"' >> ~/.bashrc
   echo 'alias xrbps="/absolute/path/to/your/xrbps.sh"' >> ~/.bashrc
   ```

3. **Reload shell configuration:**
   ```bash
   source ~/.zshrc  # or source ~/.bashrc
   ```

---

## Public APIs

### rbps.sh

**Purpose:** Generates React/Preact component boilerplate with standard import paths.

#### Syntax
```bash
rbps <ComponentName>
```

#### Parameters
- `ComponentName` (required): The name of the component to generate
  - Type: String
  - Constraints: Must be a valid JavaScript identifier
  - Example: `MyButton`, `UserProfile`, `NavigationMenu`

#### Return Values
- **Exit Code 0:** Success - Component files created
- **Exit Code 1:** Error - Missing argument or file already exists

#### Generated Files
1. `<ComponentName>/<ComponentName>.js` - Main component file
2. `<ComponentName>/<ComponentName>.styles.js` - Styles file

#### Import Configuration
- Uses `'preact-htm'` for HTML templating
- Uses `'styled'` for styling

---

### xrbps.sh

**Purpose:** Generates React/Preact component boilerplate with explicit library paths (extended version).

#### Syntax
```bash
xrbps <ComponentName>
```

#### Parameters
- `ComponentName` (required): The name of the component to generate
  - Type: String
  - Constraints: Must be a valid JavaScript identifier
  - Example: `MyButton`, `UserProfile`, `NavigationMenu`

#### Return Values
- **Exit Code 0:** Success - Component files created
- **Exit Code 1:** Error - Missing argument or file already exists

#### Generated Files
1. `<ComponentName>/<ComponentName>.js` - Main component file
2. `<ComponentName>/<ComponentName>.styles.js` - Styles file

#### Import Configuration
- Uses `'/src/lib/preact-htm.js'` for HTML templating
- Uses `'/src/lib/styled.js'` for styling

---

## Functions

### generate_string()

**Purpose:** Generates a random CSS class name to avoid styling conflicts.

#### Syntax
```bash
generate_string
```

#### Parameters
None

#### Return Value
- Type: String
- Format: `_<8-character-random-string>`
- Character set: alphanumeric (a-z, A-Z, 0-9)
- Example: `_a7b9c2d4`

#### Implementation Details
- Uses OpenSSL for cryptographically secure random generation
- Filters output to alphanumeric characters only
- Prefixes with underscore to ensure valid CSS class name

---

## Generated File Structure

When you run either script with `ComponentName`, the following structure is created:

```
ComponentName/
├── ComponentName.js          # Main component file
└── ComponentName.styles.js   # Styles file
```

### Component File Template (`ComponentName.js`)

**rbps.sh version:**
```javascript
import { html } from 'preact-htm';
import './ComponentName.styles.js';

/* ts */`
type ComponentNameProps = {
    children: any;  
};
`;
export default function ComponentName(props) {
    return html`
        <div class="_randomString"></div>
    `;
}
```

**xrbps.sh version:**
```javascript
import { html } from '/src/lib/preact-htm.js';
import './ComponentName.styles.js';

/* ts */`
type ComponentNameProps = {
    children: any;  
};
`;
export default function ComponentName(props) {
    return html`
        <div class="_randomString"></div>
    `;
}
```

### Styles File Template (`ComponentName.styles.js`)

**rbps.sh version:**
```javascript
import styled from 'styled';
export default styled`
    ._randomString {
        
    }
`;
```

**xrbps.sh version:**
```javascript
import styled from '/src/lib/styled.js';
export default styled`
    ._randomString {
        
    }
`;
```

---

## Usage Examples

### Basic Component Generation

```bash
# Generate a simple button component
rbps Button

# Output:
# /current/directory/Button/Button.js
# |-- /current/directory/Button/Button.js
# |-- /current/directory/Button/Button.styles.js
# Component boilerplate created! 🤖✨
```

### Complex Component Names

```bash
# Generate components with descriptive names
rbps UserProfileCard
rbps NavigationHeader
rbps ProductListItem
```

### Using Extended Version

```bash
# Use xrbps for projects with explicit lib paths
xrbps Modal
xrbps DataTable
```

### Integration in Development Workflow

```bash
# Navigate to components directory
cd src/components

# Generate multiple components
rbps Header
rbps Footer
rbps Sidebar

# Verify creation
ls -la
# Header/
# Footer/
# Sidebar/
```

---

## Error Handling

### Missing Component Name
```bash
$ rbps
Please provide a component name as an argument.
# Exit code: 1
```

### File Already Exists
```bash
$ rbps Button
File already exists: /current/path/Button/Button.js
# Exit code: 1
```

### Permission Issues
If you encounter permission errors:
```bash
# Ensure script is executable
chmod +x rbps.sh

# Check directory write permissions
ls -la $(dirname $(pwd))
```

### OpenSSL Not Available
If `generate_string` fails:
```bash
# Install OpenSSL (Ubuntu/Debian)
sudo apt-get install openssl

# Install OpenSSL (macOS)
brew install openssl
```

---

## Configuration

### Customizing Import Paths

To modify import paths, edit the respective script files:

**For rbps.sh:**
```bash
# Line 60-61: Modify import statements
import { html } from 'your-html-library';
import './ComponentName.styles.js';

# Line 75-76: Modify styled import
import styled from 'your-styled-library';
```

**For xrbps.sh:**
```bash
# Line 60-61: Modify import statements
import { html } from '/your/custom/path/html-library.js';
import './ComponentName.styles.js';

# Line 75-76: Modify styled import
import styled from '/your/custom/path/styled-library.js';
```

### Customizing Component Template

To modify the generated component structure, edit the heredoc sections:

```bash
# Lines 59-67: Component file template
cat << EOF > "$js_file"
# Your custom template here
EOF

# Lines 74-80: Styles file template
cat << EOF > "$style_file"
# Your custom styles template here
EOF
```

### Customizing CSS Class Generation

To modify the random class name generation:

```bash
# Edit generate_string function (lines 35-40)
generate_string() {
  local length=12        # Change length
  local first_char=comp  # Change prefix
  # Modify generation logic as needed
}
```

---

## Best Practices

### Component Naming
- Use PascalCase for component names: `MyComponent`, `UserProfile`
- Avoid special characters and spaces
- Choose descriptive, meaningful names

### Directory Organization
```bash
# Recommended project structure
src/
├── components/
│   ├── Button/
│   ├── Modal/
│   └── Form/
├── pages/
└── lib/
```

### Workflow Integration
```bash
# Create component and immediately start editing
rbps NewComponent && code NewComponent/
```

### Version Control
Add generated files to git after customization:
```bash
git add ComponentName/
git commit -m "Add ComponentName component boilerplate"
```

---

## Troubleshooting

### Common Issues

1. **Command not found**
   - Verify alias is set correctly
   - Check script path in alias
   - Reload shell configuration

2. **Permission denied**
   - Ensure script has execute permissions: `chmod +x rbps.sh`
   - Check directory write permissions

3. **Random string generation fails**
   - Verify OpenSSL installation
   - Check if `openssl rand` command works

4. **Files not created**
   - Check available disk space
   - Verify target directory exists and is writable
   - Check for filesystem restrictions

### Debug Mode

To debug script execution:
```bash
bash -x rbps.sh ComponentName
```

This will show each command as it executes, helping identify issues.

---

## Contributing

When modifying the scripts:

1. Test with various component names
2. Verify generated files compile correctly
3. Check cross-platform compatibility
4. Update this documentation for any API changes

## License

This project is distributed under the terms specified in the LICENSE file.