describe('table', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <table class="st-splitter-table"
             data-controller="splitter">
        <tr>
          <th>header 1</th>
          <th><hr data-splitter-id="s1">header 2</th>
          <th><hr data-splitter-id="s2">header 3</th>
        </tr>
        <tr>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
        </tr>
      </table>
    `;
  });

  beforeEach(() => {
    mockElementSize('th', 200, 200);
  });

  beforeEach(() => {
    $('hr[data-splitter-id="s1"]').dispatchEvent(mockMouseEvent('mousedown', { bubbles: true, pageX: 0, pageY: 0 }));
  });

  it('resizes', () => {
    document.dispatchEvent(mockMouseEvent('mousemove', { bubbles: true, pageX: 100, pageY: 100 }));
    document.dispatchEvent(mockMouseEvent('mouseup', { bubbles: true }));
    expect($('th').style.width).toEqual('300px');
  });
});
