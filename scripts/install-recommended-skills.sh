#!/usr/bin/env bash
# install-recommended-skills.sh
# Install the recommended ecosystem skills for projects bootstrapped from base.
# Run this after `git init` on your new project.
#
# Usage: bash scripts/install-recommended-skills.sh

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "Installing recommended agent skills..."
echo ""

echo "Core workflow:"
echo "  planning-with-files          (OthmanAdi/planning-with-files)"
npx skills add OthmanAdi/planning-with-files -g -y
echo -e "  ${GREEN}OK${NC}"

echo "  grill-me                     (mattpocock/skills)"
npx skills add mattpocock/skills@grill-me -g -y
echo -e "  ${GREEN}OK${NC}"

echo "  write-a-prd                  (mattpocock/ai-engineer-workshop-2026-project)"
npx skills add mattpocock/ai-engineer-workshop-2026-project@write-a-prd -g -y
echo -e "  ${GREEN}OK${NC}"

echo "  prd-to-issues                (mattpocock/ai-engineer-workshop-2026-project)"
npx skills add mattpocock/ai-engineer-workshop-2026-project@prd-to-issues -g -y
echo -e "  ${GREEN}OK${NC}"

echo ""
echo "Code quality:"
echo "  tdd                          (mattpocock/skills)"
npx skills add mattpocock/skills@tdd -g -y
echo -e "  ${GREEN}OK${NC}"

echo "  improve-codebase-architecture (mattpocock/skills)"
npx skills add mattpocock/skills@improve-codebase-architecture -g -y
echo -e "  ${GREEN}OK${NC}"

echo ""
echo "Security:"
echo "  supply-chain-risk-auditor    (trailofbits/skills)"
npx skills add trailofbits/skills@supply-chain-risk-auditor -g -y
echo -e "  ${GREEN}OK${NC}"

echo "  differential-review          (trailofbits/skills)"
npx skills add trailofbits/skills@differential-review -g -y
echo -e "  ${GREEN}OK${NC}"

echo "  sharp-edges                  (trailofbits/skills)"
npx skills add trailofbits/skills@sharp-edges -g -y
echo -e "  ${GREEN}OK${NC}"

echo ""
echo "Optional (install now? y/N):"
read -p "  frontend-design (anthropics/skills) [595K installs]? " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  npx skills add anthropics/skills@frontend-design -g -y
  echo -e "  ${GREEN}OK${NC}"
else
  echo -e "  ${YELLOW}SKIPPED${NC}"
fi

read -p "  superpowers (obra/superpowers) [680K+ installs, heavyweight]? " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  npx skills add obra/superpowers -g -y
  echo -e "  ${GREEN}OK${NC}"
else
  echo -e "  ${YELLOW}SKIPPED${NC}"
fi

echo ""
echo "Done. Run security-review-skills on each new skill and update"
echo ".claude/skills-audit.json with the review results."
