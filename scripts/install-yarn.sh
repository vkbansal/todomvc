for dir in ./examples/*/
do
    pushd ${dir}
    rm -rf node_modules
    yarn --no-lockfile install
    popd
done
