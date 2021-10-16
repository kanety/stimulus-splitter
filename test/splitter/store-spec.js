describe('store', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="st-splitter-vertical"
          data-controller="splitter"
          data-splitter-store-key-value="splitter">
        <div>content 1</div>
        <hr data-splitter-id="s1">
        <div class="st-splitter-horizontal">
          <div>content 1</div>
          <hr data-splitter-id="s2">
          <div>content 2</div>
        </div>
      </div>
    `;
  });

  beforeEach(() => {
    mockElementSize('div', 100, 100);
    $('hr[data-splitter-id="s1"]').dispatchEvent(mockMouseEvent('mousedown', { bubbles: true }));
  });

  it('saves states', () => {
    $('hr[data-splitter-id="s1"]').dispatchEvent(mockMouseEvent('mouseup', { bubbles: true }));
    expect(JSON.parse(sessionStorage.getItem('splitter'))['s1']).toEqual([[100, 100], [100, 100]]);
    expect(JSON.parse(sessionStorage.getItem('splitter'))['s2']).toEqual([[100, 100], [100, 100]]);
  });

  it('loads states', () => {
    expect($('hr[data-splitter-id="s1"]').previousElementSibling.style.width).toEqual('100px');
    expect($('hr[data-splitter-id="s2"]').previousElementSibling.style.height).toEqual('100px');
  });
});
