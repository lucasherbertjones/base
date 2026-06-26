# install-recommended-skills.ps1
# Install the recommended ecosystem skills for projects bootstrapped from base.
# Run this after `git init` on your new project.
#
# Usage: .\scripts\install-recommended-skills.ps1

$ErrorActionPreference = "Stop"

Write-Host "Installing recommended agent skills..." -ForegroundColor Cyan
Write-Host ""

Write-Host "Core workflow:"
Write-Host "  planning-with-files          (OthmanAdi/planning-with-files)"
npx skills add OthmanAdi/planning-with-files -g -y
if ($?) { Write-Host "  OK" -ForegroundColor Green } else { Write-Host "  FAILED" -ForegroundColor Red }

Write-Host "  grill-me                     (mattpocock/skills)"
npx skills add mattpocock/skills@grill-me -g -y
if ($?) { Write-Host "  OK" -ForegroundColor Green } else { Write-Host "  FAILED" -ForegroundColor Red }

Write-Host "  write-a-prd                  (mattpocock/ai-engineer-workshop-2026-project)"
npx skills add mattpocock/ai-engineer-workshop-2026-project@write-a-prd -g -y
if ($?) { Write-Host "  OK" -ForegroundColor Green } else { Write-Host "  FAILED" -ForegroundColor Red }

Write-Host "  prd-to-issues                (mattpocock/ai-engineer-workshop-2026-project)"
npx skills add mattpocock/ai-engineer-workshop-2026-project@prd-to-issues -g -y
if ($?) { Write-Host "  OK" -ForegroundColor Green } else { Write-Host "  FAILED" -ForegroundColor Red }

Write-Host ""
Write-Host "Code quality:"
Write-Host "  tdd                          (mattpocock/skills)"
npx skills add mattpocock/skills@tdd -g -y
if ($?) { Write-Host "  OK" -ForegroundColor Green } else { Write-Host "  FAILED" -ForegroundColor Red }

Write-Host "  improve-codebase-architecture (mattpocock/skills)"
npx skills add mattpocock/skills@improve-codebase-architecture -g -y
if ($?) { Write-Host "  OK" -ForegroundColor Green } else { Write-Host "  FAILED" -ForegroundColor Red }

Write-Host ""
Write-Host "Security:"
Write-Host "  supply-chain-risk-auditor    (trailofbits/skills)"
npx skills add trailofbits/skills@supply-chain-risk-auditor -g -y
if ($?) { Write-Host "  OK" -ForegroundColor Green } else { Write-Host "  FAILED" -ForegroundColor Red }

Write-Host "  differential-review          (trailofbits/skills)"
npx skills add trailofbits/skills@differential-review -g -y
if ($?) { Write-Host "  OK" -ForegroundColor Green } else { Write-Host "  FAILED" -ForegroundColor Red }

Write-Host "  sharp-edges                  (trailofbits/skills)"
npx skills add trailofbits/skills@sharp-edges -g -y
if ($?) { Write-Host "  OK" -ForegroundColor Green } else { Write-Host "  FAILED" -ForegroundColor Red }

Write-Host ""
Write-Host "Optional skills:"

$installFrontend = Read-Host "  frontend-design (anthropics/skills) [595K installs]? (y/N)"
if ($installFrontend -eq 'y' -or $installFrontend -eq 'Y') {
  npx skills add anthropics/skills@frontend-design -g -y
  if ($?) { Write-Host "  OK" -ForegroundColor Green } else { Write-Host "  FAILED" -ForegroundColor Red }
} else {
  Write-Host "  SKIPPED" -ForegroundColor Yellow
}

$installSuperpowers = Read-Host "  superpowers (obra/superpowers) [680K+ installs, heavyweight]? (y/N)"
if ($installSuperpowers -eq 'y' -or $installSuperpowers -eq 'Y') {
  npx skills add obra/superpowers -g -y
  if ($?) { Write-Host "  OK" -ForegroundColor Green } else { Write-Host "  FAILED" -ForegroundColor Red }
} else {
  Write-Host "  SKIPPED" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Done. Run security-review-skills on each new skill and update" -ForegroundColor Cyan
Write-Host ".claude/skills-audit.json with the review results." -ForegroundColor Cyan
