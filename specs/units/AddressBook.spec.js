const AddressBook = require("../../src/js/AddressBook");

describe.only("AddressBook", () => {
  subject(() => new AddressBook());
  afterEach(() => {
    window.localStorage.data = {};
    sinon.reset();
  });

  it(() => is.expected.to.be.an("object"));

  it(() => is.expected.to.be.an.instanceOf(AddressBook));

  it(() => is.expected.to.respondTo("index"));

  it(() => is.expected.to.respondTo("create"));

  let getItemSpy, setItemSpy, stringifySpy, parseSpy, message;
  getItemSpy = sinon.spy(window.localStorage, "getItem");
  setItemSpy = sinon.spy(window.localStorage, "setItem");
  stringifySpy = sinon.spy(JSON, "stringify");
  parseSpy = sinon.spy(JSON, "parse");
  describe("#create", () => {
    def("contactsInStorage", () =>
      JSON.parse(window.localStorage.data.entries)
    );
    def("validData", {
      name: "John Doe",
      email: "john@mailhost.com",
      phone: "+1202123456",
      twitter: "@john_doe",
    });

    def("invalidData", "this is NOT an object!");

    context("first entry with valid data", () => {
      beforeEach(() => {
        message = $subject.create($validData);
      });

      it("is expected to call on localStorage.getItem()", () => {
        expect(getItemSpy).to.have.been.calledOnce;
      });

      it("is expected to call on localStorage.setItem()", () => {
        expect(setItemSpy).to.have.been.calledOnce;
      });

      it("is expected to call on JSON.stringify()", () => {
        expect(stringifySpy).to.have.been.calledOnce;
      });

      it("is expected to call on JSON.parse()", () => {
        expect(parseSpy).to.have.been.calledOnce;
      });

      it("is expected to add a contact to localStorage", () => {
        expect($contactsInStorage).to.have.length(1);
      });

      it("is expected to respond with success message", () => {
        expect(message).to.equal("The entry was added to the address book");
      });
    });
    context("with invalid data", () => {
      before(() => {
        message = $subject.create($invalidData);
      });

      it("is expected to respond with success message", () => {
        expect(message).to.equal("We could not process your entry.");
      });
    });
  });

  describe("#index", () => {
    let collection;
    beforeEach(() => {
      $subject.create({ name: "Thomas" });
      $subject.create({ name: "Thadeus" });
      $subject.create({ name: "Jessica" });
      sinon.reset();
      collection = $subject.index();
    });

    it("is expected to call on localStorage.getItem()", () => {
      expect(getItemSpy).to.have.been.calledOnce;
    });

    it("is expected to return an array with 3 objects", () => {
      expect(collection).to.have.length(3);
    });
  });
});
