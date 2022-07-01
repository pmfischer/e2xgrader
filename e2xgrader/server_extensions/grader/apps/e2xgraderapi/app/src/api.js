function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    for (let cookie of document.cookie.split(';')) {
      if (cookie.trim().substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// https://stackoverflow.com/questions/29855098/is-there-a-built-in-javascript-function-similar-to-os-path-join
export const pathJoin = (parts, sep) => {
    const separator = sep || '/';
    parts = parts.map((part, index) => {
        if (index) {
            part = part.replace(new RegExp('^' + separator), '');
        }
        if (index !== parts.length - 1) {
            part = part.replace(new RegExp(separator + '$'), '');
        }
        return part;
    });
    return parts.join(separator);
}

const api_url = pathJoin([window.base_url, '/formgrader/api/']);
const authoring_api_url = pathJoin([window.base_url, '/taskcreator/api/']);

export const get = (url) => {
    return fetch(url)
        .then((response) => response.json())
        .then((json) => {return json});
}

export const post = (url, data) => {
    let settings = {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            "X-CSRFToken": getCookie("_xsrf")
        },
        body: JSON.stringify(data)
    }
    return fetch(url, settings)
        .then((response) => response.json())
        .then((json) => {return json});
}

export const put = (url, data) => {
    let settings = {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
            "X-CSRFToken": getCookie("_xsrf")
        },
        body: JSON.stringify(data)
    }
    return fetch(url, settings)
        .then((response) => response.json())
        .then((json) => {return json});
}

export const get_assignments = () => {
    return get(pathJoin([api_url, 'assignments']));
}

export const get_assignment = (assignment) => {
    return get(pathJoin([api_url, 'assignment', assignment]));
}

export const get_notebooks = (assignment) => {
    return get(pathJoin([api_url, 'notebooks', assignment]));
}

export const get_students = () => {
    return get(pathJoin([api_url, 'students']));
}

export const get_student = (student) => {
    return get(pathJoin([api_url, 'student', student]));
}

export const create_student = (student_id, first_name, last_name, email) => {
    return put(
        pathJoin([api_url, 'student', student_id]),
        {
            first_name: first_name,
            last_name: last_name,
            email: email
        }
    );
}

export const get_submissions = (assignment) => {
    return get(pathJoin([api_url, 'submissions', assignment]));
}

export const generate_feedback = (assignment, student, hide_cells=false) => {
    return post(
        pathJoin([api_url, 'assignment', assignment, student, 'generate_feedback']),
        {hide_cells: hide_cells}
    );
}

export const generate_all_feedback = (assignment, hide_cells=false) => {
    return post(
        pathJoin([api_url, 'assignment', assignment, 'generate_feedback']),
        {hide_cells: hide_cells}
    );
}

export const get_pools = () => {
    return get(pathJoin([authoring_api_url, 'pools']));
}

export const get_tasks = (pool) => {
    return get(pathJoin([authoring_api_url, 'pools', pool]));
}

export const get_graders = () => {
    return get(pathJoin([window.base_url, '/e2xgrader/api/', 'graders']));
}
