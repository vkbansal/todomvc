for dir in ./examples/*/
do
    pushd ${dir}
    npm install
    popd
done
