// EuroDoot — shared site script. Mobile nav, dropdown, FAQ accordion, form handling.

document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.querySelector('.mobile-panel');
  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      var isOpen = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Desktop dropdown (click-toggle, keyboard accessible)
  document.querySelectorAll('.has-dropdown > button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var parent = btn.parentElement;
      var wasOpen = parent.classList.contains('open');
      document.querySelectorAll('.has-dropdown').forEach(function (d) { d.classList.remove('open'); });
      if (!wasOpen) parent.classList.add('open');
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.has-dropdown').forEach(function (d) { d.classList.remove('open'); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.has-dropdown').forEach(function (d) { d.classList.remove('open'); });
    }
  });

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.parentElement;
      var wasOpen = item.classList.contains('open');
      // Close siblings within the same list only
      var list = item.closest('.faq-list');
      if (list) {
        list.querySelectorAll('.faq-item.open').forEach(function (i) { i.classList.remove('open'); });
      }
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Eligibility / contact form -> WhatsApp handoff
  var form = document.getElementById('eligibility-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var get = function (id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
      };
      var lines = [
        'Free Eligibility Check Request:',
        '',
        'Name: ' + get('f-name'),
        'Age: ' + get('f-age'),
        'City/Country: ' + get('f-city'),
        'WhatsApp: ' + get('f-phone'),
        'Email: ' + (get('f-email') || 'Not provided'),
        'Highest qualification: ' + get('f-qual'),
        'Training/education duration: ' + (get('f-duration') || 'Not provided'),
        'Current occupation: ' + (get('f-job') || 'Not provided'),
        'Years of relevant experience: ' + (get('f-experience') || 'Not provided'),
        'German language level: ' + get('f-german'),
        'Preferred pathway: ' + get('f-pathway')
      ];
      var text = encodeURIComponent(lines.join('\n'));
      window.open('https://wa.me/919310527346?text=' + text, '_blank');

      var confirmBox = document.getElementById('form-confirm');
      if (confirmBox) {
        form.style.display = 'none';
        confirmBox.classList.add('show');
        confirmBox.setAttribute('tabindex', '-1');
        confirmBox.focus();
      }
    });
  }
});
