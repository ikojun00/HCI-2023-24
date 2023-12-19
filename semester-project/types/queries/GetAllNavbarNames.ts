const qGetAllNavbarNames = `query {
    navbarCollection {
        items {
            title,
            path,
            dropdowns
        }
    }
}`;

export default qGetAllNavbarNames;
