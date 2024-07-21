import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

interface Props {
  person: Person;
  findParent: (name: string | null) => Person | undefined;
}

export const PersonLink: React.FC<Props> = ({ person, findParent }) => {
  const { name, sex, born, died, fatherName, motherName, slug } = person;
  const { personSlug } = useParams();

  const father = findParent(fatherName);
  const mother = findParent(motherName);

  console.log('slug:', slug);
  console.log('personSlug:', personSlug);
  console.log('Condition met:', slug === personSlug);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === personSlug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {!mother ? (
          motherName || '-'
        ) : (
          <Link className="has-text-danger" to={`/people/${mother.slug}`}>
            {motherName}
          </Link>
        )}
      </td>
      <td>
        {!father ? (
          fatherName || '-'
        ) : (
          <Link to={`/people/${father.slug}`}>{fatherName}</Link>
        )}
      </td>
    </tr>
  );
};
