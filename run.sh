# Run manager thing
if [ ! -f bin/senbuild ]; then
    echo "Senbuild not built yet. Building senbuild..."
    mkdir -p bin/
    clang -o bin/senbuild senbuild/src/main.c senbuild/src/senbuild_funcs.c
    echo "Finished building Senbuild."
    echo "Make sure to create a text file for senbuild to base a sentence from."
fi

# Make Mister Martinez talk
node index.js
echo "Done."
