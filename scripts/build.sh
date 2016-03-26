for dir in ./examples/*/
do
    pushd ${dir}
    ./build.sh
    popd
done
