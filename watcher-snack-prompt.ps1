# watcher-snack-prompt.ps1

# Ask student for their repo path
$repoFolder = Read-Host "Enter the full path to your GitHub repo folder"
Write-Host "Repo folder set to: $repoFolder"

# Downloads + processed folder
$downloadsFolder = "$env:USERPROFILE\Downloads"
$processedFolder = Join-Path $downloadsFolder "processed"

# Make sure processed folder exists
if (!(Test-Path $processedFolder)) {
    New-Item -ItemType Directory -Path $processedFolder | Out-Null
}

Write-Host "Watching $downloadsFolder for new Snack exports..."

# Take a snapshot of existing ZIP files so we don't process them
$seenZips = Get-ChildItem -Path $downloadsFolder -Filter "*.zip" | ForEach-Object { $_.FullName }

# Infinite loop
while ($true) {
    # Find the first ZIP file not in the seen list
    $zip = Get-ChildItem -Path $downloadsFolder -Filter "*.zip" | Where-Object { $seenZips -notcontains $_.FullName } | Sort-Object LastWriteTime | Select-Object -First 1

    if ($zip) {
        Write-Host "Processing $($zip.Name)..."

        # Add to seen list so we don't reprocess
        $seenZips += $zip.FullName

        # Unzip to repo folder, overwrite
        Expand-Archive -Path $zip.FullName -DestinationPath $repoFolder -Force

        # Prompt for commit message
        $commitMessage = Read-Host "Enter commit message for this Snack export"

        # Git commit & push
        cd $repoFolder
        git add .
        git commit -m "$commitMessage"
        git push

        # Move ZIP to processed folder
        Move-Item -Path $zip.FullName -Destination $processedFolder

        Write-Host "Done processing $($zip.Name). Waiting for next Snack export..."
    }

    # Wait a few seconds before checking again
    Start-Sleep -Seconds 5
}

