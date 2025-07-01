# Usage Examples - Shell React Boilerplate Generator

## Table of Contents

- [Basic Usage](#basic-usage)
- [Advanced Scenarios](#advanced-scenarios)
- [Integration Examples](#integration-examples)
- [Real-World Workflows](#real-world-workflows)
- [Troubleshooting Examples](#troubleshooting-examples)

---

## Basic Usage

### Simple Component Generation

```bash
# Generate a basic button component
rbps Button

# Output:
# /workspace/Button/Button.js
# |-- /workspace/Button/Button.js
# |-- /workspace/Button/Button.styles.js
# Component boilerplate created! 🤖✨
```

**Generated files:**

`Button/Button.js`:
```javascript
import { html } from 'preact-htm';
import './Button.styles.js';

/* ts */`
type ButtonProps = {
    children: any;  
};
`;
export default function Button(props) {
    return html`
        <div class="_a7b9c2d4"></div>
    `;
}
```

`Button/Button.styles.js`:
```javascript
import styled from 'styled';
export default styled`
    ._a7b9c2d4 {
        
    }
`;
```

### Extended Version with Explicit Paths

```bash
# Generate component with explicit library paths
xrbps Modal

# Creates the same structure but with different import paths
```

**Generated files:**

`Modal/Modal.js`:
```javascript
import { html } from '/src/lib/preact-htm.js';
import './Modal.styles.js';

/* ts */`
type ModalProps = {
    children: any;  
};
`;
export default function Modal(props) {
    return html`
        <div class="_x9m3k8p1"></div>
    `;
}
```

---

## Advanced Scenarios

### Batch Component Generation

```bash
#!/bin/bash
# Create multiple components at once

components=("Header" "Footer" "Sidebar" "Navigation" "Content")

for component in "${components[@]}"; do
    echo "Creating $component..."
    rbps "$component"
    echo "---"
done
```

**Output:**
```
Creating Header...
/workspace/Header/Header.js
|-- /workspace/Header/Header.js
|-- /workspace/Header/Header.styles.js
Component boilerplate created! 🤖✨
---
Creating Footer...
/workspace/Footer/Footer.js
|-- /workspace/Footer/Footer.js
|-- /workspace/Footer/Footer.styles.js
Component boilerplate created! 🤖✨
---
```

### Conditional Component Creation

```bash
#!/bin/bash
# Only create component if it doesn't exist

create_component_safe() {
    local name="$1"
    local script="${2:-rbps}"  # Default to rbps, allow xrbps
    
    if [[ -d "$name" ]]; then
        echo "⚠️  Component '$name' already exists. Skipping..."
        return 1
    else
        echo "✅ Creating component '$name'..."
        "$script" "$name"
        return 0
    fi
}

# Usage
create_component_safe "UserProfile"
create_component_safe "Dashboard" "xrbps"
```

### Component Name Validation

```bash
#!/bin/bash
# Validate component names before creation

validate_component_name() {
    local name="$1"
    
    # Check if name starts with uppercase letter
    if [[ ! "$name" =~ ^[A-Z] ]]; then
        echo "❌ Error: Component name must start with uppercase letter"
        return 1
    fi
    
    # Check if name contains only valid characters
    if [[ ! "$name" =~ ^[A-Za-z0-9]+$ ]]; then
        echo "❌ Error: Component name can only contain letters and numbers"
        return 1
    fi
    
    # Check minimum length
    if [[ ${#name} -lt 2 ]]; then
        echo "❌ Error: Component name must be at least 2 characters long"
        return 1
    fi
    
    echo "✅ Component name '$name' is valid"
    return 0
}

safe_rbps() {
    local name="$1"
    if validate_component_name "$name"; then
        rbps "$name"
    fi
}

# Usage
safe_rbps "Button"        # ✅ Valid
safe_rbps "myComponent"   # ❌ Invalid (lowercase start)
safe_rbps "User-Profile"  # ❌ Invalid (contains hyphen)
```

---

## Integration Examples

### Project Setup Script

```bash
#!/bin/bash
# Complete project setup with component generation

setup_react_project() {
    local project_name="$1"
    
    echo "🚀 Setting up React project: $project_name"
    
    # Create project structure
    mkdir -p "$project_name"/{src/{components,pages,lib,utils},public,tests}
    cd "$project_name"
    
    # Generate core components
    echo "📦 Creating core components..."
    cd src/components
    
    local core_components=("App" "Layout" "Header" "Footer" "Navigation")
    for component in "${core_components[@]}"; do
        rbps "$component"
    done
    
    # Generate page components
    echo "📄 Creating page components..."
    cd ../pages
    
    local page_components=("Home" "About" "Contact" "NotFound")
    for component in "${page_components[@]}"; do
        rbps "$component"
    done
    
    cd ../..
    echo "✅ Project setup complete!"
    echo "📁 Structure created:"
    tree . -I node_modules
}

# Usage
setup_react_project "my-awesome-app"
```

### Development Workflow Integration

```bash
#!/bin/bash
# Integrated development workflow

dev_create_component() {
    local name="$1"
    local type="${2:-component}"  # component, page, layout
    
    case "$type" in
        "component")
            cd src/components
            ;;
        "page")
            cd src/pages
            ;;
        "layout")
            cd src/layouts
            ;;
        *)
            echo "❌ Unknown type: $type"
            return 1
            ;;
    esac
    
    # Create component
    rbps "$name"
    
    # Open in editor (if available)
    if command -v code &> /dev/null; then
        code "$name/"
    elif command -v vim &> /dev/null; then
        vim "$name/$name.js"
    fi
    
    # Return to project root
    cd - > /dev/null
}

# Usage
dev_create_component "ProductCard" "component"
dev_create_component "ProductList" "page"
```

### Git Integration

```bash
#!/bin/bash
# Create component and commit to git

git_create_component() {
    local name="$1"
    local message="${2:-Add $name component boilerplate}"
    
    # Create component
    rbps "$name"
    
    # Add to git
    git add "$name/"
    git commit -m "$message"
    
    echo "✅ Component '$name' created and committed to git"
}

# Usage
git_create_component "UserCard" "Add UserCard component with styling"
```

---

## Real-World Workflows

### E-commerce Project Setup

```bash
#!/bin/bash
# Setup components for an e-commerce project

setup_ecommerce_components() {
    echo "🛒 Setting up e-commerce components..."
    
    # Create directory structure
    mkdir -p src/components/{ui,product,cart,user,layout}
    
    # UI Components
    cd src/components/ui
    for component in "Button" "Input" "Modal" "Spinner" "Alert"; do
        rbps "$component"
    done
    
    # Product Components
    cd ../product
    for component in "ProductCard" "ProductList" "ProductDetails" "ProductImage"; do
        rbps "$component"
    done
    
    # Cart Components
    cd ../cart
    for component in "CartItem" "CartSummary" "Checkout" "PaymentForm"; do
        rbps "$component"
    done
    
    # User Components
    cd ../user
    for component in "UserProfile" "LoginForm" "RegisterForm" "UserMenu"; do
        rbps "$component"
    done
    
    # Layout Components
    cd ../layout
    for component in "Header" "Footer" "Sidebar" "MainLayout"; do
        rbps "$component"
    done
    
    cd ../../..
    echo "✅ E-commerce components created!"
}

setup_ecommerce_components
```

### Dashboard Application

```bash
#!/bin/bash
# Setup components for a dashboard application

setup_dashboard_components() {
    echo "📊 Setting up dashboard components..."
    
    mkdir -p src/components/{charts,widgets,forms,navigation}
    
    # Chart Components
    cd src/components/charts
    for component in "LineChart" "BarChart" "PieChart" "AreaChart"; do
        xrbps "$component"  # Using xrbps for explicit paths
    done
    
    # Widget Components
    cd ../widgets
    for component in "StatsWidget" "TableWidget" "CardWidget" "ListWidget"; do
        xrbps "$component"
    done
    
    # Form Components
    cd ../forms
    for component in "DataForm" "FilterForm" "SearchForm" "SettingsForm"; do
        xrbps "$component"
    done
    
    # Navigation Components
    cd ../navigation
    for component in "Sidebar" "TopBar" "Breadcrumb" "TabNavigation"; do
        xrbps "$component"
    done
    
    cd ../../..
    echo "✅ Dashboard components created!"
}

setup_dashboard_components
```

### Component Library Development

```bash
#!/bin/bash
# Setup for component library development

setup_component_library() {
    local lib_name="$1"
    
    echo "📚 Setting up component library: $lib_name"
    
    # Create library structure
    mkdir -p "$lib_name"/{components,docs,examples,tests}
    cd "$lib_name"
    
    # Core components
    cd components
    local core_components=(
        "Button" "Input" "Select" "Checkbox" "Radio"
        "Modal" "Tooltip" "Dropdown" "Accordion" "Tabs"
        "Card" "Badge" "Avatar" "Spinner" "Progress"
    )
    
    for component in "${core_components[@]}"; do
        echo "Creating $component..."
        rbps "$component"
        
        # Create additional files for library
        mkdir -p "$component"/{docs,examples,tests}
        
        # Create basic documentation
        cat > "$component/docs/README.md" << EOF
# $component

## Usage

\`\`\`javascript
import $component from './$component.js';

// Basic usage
html\`<\${$component} />\`;
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | any | - | Component children |

## Examples

See \`examples/$component.example.js\`
EOF
    done
    
    cd ..
    echo "✅ Component library '$lib_name' created!"
}

setup_component_library "my-ui-library"
```

---

## Troubleshooting Examples

### Debug Mode

```bash
# Run with debug output to see what's happening
bash -x rbps.sh Button

# Output will show each command execution:
# + componentName=Button
# + js_file=/workspace/Button/Button.js
# + style_file=/workspace/Button/Button.styles.js
# + echo /workspace/Button/Button.js
# ...
```

### Permission Issues

```bash
# Check and fix permissions
ls -la rbps.sh
# -rw-r--r-- 1 user user 1900 Dec 1 10:00 rbps.sh

# Fix permissions
chmod +x rbps.sh
ls -la rbps.sh
# -rwxr-xr-x 1 user user 1900 Dec 1 10:00 rbps.sh
```

### Alias Not Working

```bash
# Check if alias is set
alias | grep rbps
# rbps='/workspace/rbps.sh'

# If not set, add to shell config
echo 'alias rbps="/workspace/rbps.sh"' >> ~/.bashrc
source ~/.bashrc

# Verify
which rbps
# rbps: aliased to /workspace/rbps.sh
```

### OpenSSL Issues

```bash
# Test OpenSSL availability
openssl rand -hex 8
# a1b2c3d4e5f6g7h8

# If not available, install
# Ubuntu/Debian:
sudo apt-get update && sudo apt-get install openssl

# macOS:
brew install openssl

# Alpine Linux:
apk add openssl
```

### File System Issues

```bash
# Check disk space
df -h .
# Filesystem      Size  Used Avail Use% Mounted on
# /dev/sda1       10G   5.0G  4.5G  53% /

# Check directory permissions
ls -ld .
# drwxr-xr-x 2 user user 4096 Dec 1 10:00 .

# Create test file to verify write permissions
touch test_write && rm test_write && echo "Write permissions OK" || echo "No write permissions"
```

### Component Name Conflicts

```bash
# Check for existing components before creation
check_component_exists() {
    local name="$1"
    if [[ -d "$name" ]]; then
        echo "⚠️  Component '$name' already exists:"
        ls -la "$name/"
        return 1
    else
        echo "✅ Component name '$name' is available"
        return 0
    fi
}

# Safe creation with backup
safe_create_with_backup() {
    local name="$1"
    if [[ -d "$name" ]]; then
        echo "📦 Backing up existing component..."
        mv "$name" "${name}_backup_$(date +%Y%m%d_%H%M%S)"
    fi
    rbps "$name"
}

# Usage
check_component_exists "Button"
safe_create_with_backup "Button"
```

### Bulk Operations with Error Handling

```bash
#!/bin/bash
# Create multiple components with proper error handling

create_components_batch() {
    local components=("$@")
    local success_count=0
    local error_count=0
    local errors=()
    
    for component in "${components[@]}"; do
        echo "Creating $component..."
        if rbps "$component" > /dev/null 2>&1; then
            echo "✅ $component created successfully"
            ((success_count++))
        else
            echo "❌ Failed to create $component"
            errors+=("$component")
            ((error_count++))
        fi
    done
    
    echo ""
    echo "📊 Summary:"
    echo "   ✅ Successful: $success_count"
    echo "   ❌ Failed: $error_count"
    
    if [[ ${#errors[@]} -gt 0 ]]; then
        echo "   Failed components: ${errors[*]}"
    fi
}

# Usage
create_components_batch "Button" "Modal" "Card" "List" "Form"
```

This comprehensive documentation provides users with detailed information about all public APIs, functions, and components, along with practical examples and troubleshooting guidance for the Shell React Boilerplate Generator project.