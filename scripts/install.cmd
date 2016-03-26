@echo off
FOR /D %%f in (%CD%\examples\*) do (
    pushd %%f
    npm install
    popd
)
