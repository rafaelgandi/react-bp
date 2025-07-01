# Function Reference - Shell React Boilerplate Generator

## Quick Reference

### Command Line Tools

| Command | Purpose | Syntax | Required Args | Exit Codes |
|---------|---------|--------|---------------|------------|
| `rbps` | Generate component with standard imports | `rbps <ComponentName>` | ComponentName | 0=success, 1=error |
| `xrbps` | Generate component with explicit paths | `xrbps <ComponentName>` | ComponentName | 0=success, 1=error |

### Internal Functions

| Function | Purpose | Parameters | Returns | Usage |
|----------|---------|------------|---------|-------|
| `generate_string()` | Create random CSS class | None | String: `_<8chars>` | Internal only |

---

## Detailed Function Signatures

### rbps.sh

```bash
#!/bin/bash
# Function: rbps <ComponentName>
# Purpose: Generate React/Preact component boilerplate with standard imports
# 
# Parameters:
#   $1 (ComponentName) - Required string, valid JS identifier
#
# Returns:
#   Exit 0: Success, files created
#   Exit 1: Error (missing arg or file exists)
#
# Side Effects:
#   Creates directory: ./<ComponentName>/
#   Creates file: ./<ComponentName>/<ComponentName>.js
#   Creates file: ./<ComponentName>/<ComponentName>.styles.js
#   Prints: File paths and success message
#
# Example:
#   rbps Button
#   # Creates: Button/Button.js, Button/Button.styles.js
```

### xrbps.sh

```bash
#!/bin/bash
# Function: xrbps <ComponentName>
# Purpose: Generate React/Preact component boilerplate with explicit library paths
# 
# Parameters:
#   $1 (ComponentName) - Required string, valid JS identifier
#
# Returns:
#   Exit 0: Success, files created
#   Exit 1: Error (missing arg or file exists)
#
# Side Effects:
#   Creates directory: ./<ComponentName>/
#   Creates file: ./<ComponentName>/<ComponentName>.js (with /src/lib/ imports)
#   Creates file: ./<ComponentName>/<ComponentName>.styles.js (with /src/lib/ imports)
#   Prints: File paths and success message
#
# Example:
#   xrbps Modal
#   # Creates: Modal/Modal.js, Modal/Modal.styles.js
```

### generate_string()

```bash
# Function: generate_string
# Purpose: Generate cryptographically secure random CSS class name
# Scope: Internal function (not directly callable)
#
# Parameters: None
#
# Returns:
#   String: "_" + 8 random alphanumeric characters
#   Example: "_a7b9c2d4", "_X9m3K8p1"
#
# Dependencies:
#   - openssl command
#   - tr command
#   - fold command
#   - head command
#
# Implementation:
#   Uses openssl rand -hex 8 | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1
```

---

## Error Conditions

### Common Error Scenarios

| Error | Exit Code | Message | Solution |
|-------|-----------|---------|----------|
| Missing argument | 1 | "Please provide a component name as an argument." | Provide component name |
| File exists | 1 | "File already exists: <path>" | Use different name or remove existing |
| No execute permission | 126 | "Permission denied" | Run `chmod +x script.sh` |
| Command not found | 127 | "command not found" | Check alias setup |

### Validation Rules

| Parameter | Validation | Valid Examples | Invalid Examples |
|-----------|------------|----------------|------------------|
| ComponentName | Must be valid JS identifier | `Button`, `UserCard`, `Nav123` | `my-component`, `123Button`, `user component` |

---

## Output Specifications

### File Generation Patterns

#### Component File (`<ComponentName>.js`)

**Standard version (rbps.sh):**
```javascript
import { html } from 'preact-htm';
import './<ComponentName>.styles.js';

/* ts */`
type <ComponentName>Props = {
    children: any;  
};
`;
export default function <ComponentName>(props) {
    return html`
        <div class="<randomClass>"></div>
    `;
}
```

**Extended version (xrbps.sh):**
```javascript
import { html } from '/src/lib/preact-htm.js';
import './<ComponentName>.styles.js';

/* ts */`
type <ComponentName>Props = {
    children: any;  
};
`;
export default function <ComponentName>(props) {
    return html`
        <div class="<randomClass>"></div>
    `;
}
```

#### Styles File (`<ComponentName>.styles.js`)

**Standard version (rbps.sh):**
```javascript
import styled from 'styled';
export default styled`
    .<randomClass> {
        
    }
`;
```

**Extended version (xrbps.sh):**
```javascript
import styled from '/src/lib/styled.js';
export default styled`
    .<randomClass> {
        
    }
`;
```

### Console Output Format

```
<full-path-to-component-file>
|-- <relative-path-to-component-file>
|-- <relative-path-to-styles-file>
Component boilerplate created! 🤖✨
```

**Example:**
```
/home/user/project/Button/Button.js
|-- /home/user/project/Button/Button.js
|-- /home/user/project/Button/Button.styles.js
Component boilerplate created! 🤖✨
```

---

## Integration Patterns

### Batch Operations

```bash
# Generate multiple components
for component in Header Footer Sidebar; do
    rbps "$component"
done
```

### Conditional Generation

```bash
# Only generate if component doesn't exist
generate_if_not_exists() {
    local name="$1"
    if [[ ! -d "$name" ]]; then
        rbps "$name"
    else
        echo "Component $name already exists"
    fi
}
```

### Custom Wrapper

```bash
# Wrapper with validation
safe_rbps() {
    local name="$1"
    if [[ "$name" =~ ^[A-Z][a-zA-Z0-9]*$ ]]; then
        rbps "$name"
    else
        echo "Error: Component name must start with uppercase letter"
        return 1
    fi
}
```

---

## Performance Characteristics

| Operation | Time Complexity | Space Complexity | Notes |
|-----------|----------------|------------------|-------|
| Component generation | O(1) | O(1) | Fixed-size file creation |
| Random string generation | O(1) | O(1) | 8-character fixed length |
| Directory creation | O(1) | O(1) | Single directory level |

### Resource Usage

- **CPU**: Minimal (primarily I/O bound)
- **Memory**: < 1MB (shell script execution)
- **Disk**: ~500 bytes per component (template files)
- **Network**: None (local operation only)

---

## Version Compatibility

### Shell Requirements
- **Bash**: 3.0+ (uses arrays and modern syntax)
- **Zsh**: Compatible with bash mode
- **Fish**: Not compatible (different syntax)

### System Dependencies
- **OpenSSL**: Any version with `rand` command
- **Coreutils**: `tr`, `fold`, `head`, `mkdir`, `cat`
- **Filesystem**: POSIX-compliant (ext4, APFS, NTFS)