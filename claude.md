# DentoBridge Landing Page - Development Guide

## Language Rules

**Code & Comments**: English only
- Variable names, functions, classes in English
- All code comments in English

**Frontend/UI**: French only
- All text displayed to users
- Buttons, headings, descriptions

```javascript
// GOOD
function submitContactForm(formData) {
  // Validate email format before submission
  return { message: "Formulaire envoyé avec succès" };
}

// BAD
function envoyerFormulaire(formData) {
  // Valider l'email
  return { message: "Form submitted successfully" };
}
```

## Development Workflow

### Before Coding (Planning Mode)

1. **Search for best practices** online for the specific feature
2. **Find existing packages** - don't reinvent the wheel
3. **Compare solutions** (GitHub stars, maintenance, documentation)
4. **Make informed decision**: build vs buy
5. ** Ask Question ** If needed ask me more question if you need answers to make important décisions in the plan
## Pre-Commit Checklist

- [ ] Code & comments in English
- [ ] All UI text in French
- [ ] Researched existing packages for new features

---

**Version**: 1.0