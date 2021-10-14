describe('store', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="st-splitter-vertical"
          data-controller="splitter"
          data-splitter-store-key-value="splitter">
        <div>
          <p>content 1</p>
        </div>
        <hr data-splitter-id="s1">
        <div class="st-splitter-horizontal">
          <div>
            <p>content 1</p>
          </div>
          <hr data-splitter-id="s2">
          <div>
            <p>content 2</p>
          </div>
        </div>
    </div>
    `;
  });

  beforeEach(() => {
    $$('div').forEach(elem => {
      Object.defineProperty(elem, 'offsetWidth', {
        get: () => 100
      });
      Object.defineProperty(elem, 'offsetHeight', {
        get: () => 100
      });
    });
    $('hr[data-splitter-id="s1"]').dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  });

  it('saves states', () => {
    $('hr[data-splitter-id="s1"]').dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    expect(JSON.parse(sessionStorage.getItem('splitter'))['s1']).toEqual([100, 100]);
    expect(JSON.parse(sessionStorage.getItem('splitter'))['s2']).toEqual([100, 100]);
  });

  it('loads states', () => {
    expect($('hr[data-splitter-id="s1"]').previousElementSibling.style.width).toEqual('100px');
    expect($('hr[data-splitter-id="s2"]').previousElementSibling.style.height).toEqual('100px');
  });
});
