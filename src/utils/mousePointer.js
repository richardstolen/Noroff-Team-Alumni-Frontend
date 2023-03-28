function setLoading() {
  document.body.style.cursor = "wait";
}

function setDefault() {
  document.body.style.cursor = "default";
}

const Pointer = {
  setLoading,
  setDefault,
};

export default Pointer;
