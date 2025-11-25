const API = {
  login: (username, password) => fetch('/api/auth/login', {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify({username,password})
  }).then(r=>r.json()),

  googleLogin: (credential) => fetch('/api/auth/google', {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify({credential})
  }).then(r=>r.json()),

  logout: (token) => fetch('/api/auth/logout', {method:'POST', headers:{'X-Auth-Token': token}}).then(r=>r.json()),

  listCourses: (token) => fetch('/api/courses', {headers: {'X-Auth-Token': token}}).then(r=>r.json()),

  createCourse: (token, course) => fetch('/api/courses', {
    method:'POST', headers: {'Content-Type':'application/json','X-Auth-Token': token}, body: JSON.stringify(course)
  }).then(r=>r.json()),

  deleteCourse: (token, id) => fetch(`/api/courses/${id}`, {method:'DELETE', headers: {'X-Auth-Token': token}}).then(r=>r.json())
}

export default API;
