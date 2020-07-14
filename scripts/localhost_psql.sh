#!bin/bash

# Download and run PostgreSQL
brew install postgres

# Create Alias for starting PostgreSQL Server
alias pg_start="launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist"

# Create Alias for stopping PostgreSQL Server
alias pg_stop="launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist"
