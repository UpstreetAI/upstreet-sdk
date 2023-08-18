set -e  # if any step fails, kill the entire script and warn the user something went wrong

# get VERSION from args --version=
VERSION=${1/--version=/}

export TWINE_USERNAME=${2/--username=/}
export TWINE_PASSWORD=${3/--password=/}

# Check if these dependencies are installed, and install them if they aren't
pip install twine || echo "Failed to install twine"
pip install wheel || echo "Failed to install wheel"

# Make sure these work, and stop the script if they error
# Run setup checks and build
python setup.py check || { echo "Setup check failed"; exit 1; }
python setup.py sdist || { echo "Source distribution build failed"; exit 1; }
python setup.py bdist_wheel --universal || { echo "Wheel build failed"; exit 1; }

# Make sure these work, and stop the script if they error
# Upload to test repo
twine upload dist/upstreet-${VERSION}.tar.gz --repository-url https://test.pypi.org/legacy/ || { echo "Upload to test repo failed"; exit 1; }
pip install --index-url https://test.pypi.org/simple/ upstreet --user || { echo "Installation from test repo failed"; exit 1; }

# Final upload
twine upload dist/upstreet-${VERSION}.tar.gz || { echo "Final upload failed"; exit 1; }
pip install upstreet --user || { echo "Installation of upstreet failed"; exit 1; }

git add upstreet/__init__.py
git add setup.py
git commit -m "Published ${VERSION}"
git push origin main

echo "Publishing to npm"

npm publish

# Let the user know that everything completed successfully
echo "Script completed successfully"