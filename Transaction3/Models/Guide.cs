using System;
using System.Collections.Generic;

namespace Transaction3.Models;

public partial class Guide
{
    public int Id { get; set; }

    public string? City { get; set; }

    public DateTime? CreatedTimestamp { get; set; }

    public string? Name { get; set; }

    public string? Phone { get; set; }

    public string? Pwd { get; set; }

    public string? Email { get; set; }

    public virtual ICollection<Event> Events { get; set; } = new List<Event>();
}
